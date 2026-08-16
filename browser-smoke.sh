#!/usr/bin/env bash
set -euo pipefail

python3 -m http.server 4173 --directory _site >/tmp/firmakroner-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
for i in {1..20}; do curl -fsS http://127.0.0.1:4173/ >/dev/null && break; sleep .25; done

python3 - <<'PY' > /tmp/site-paths.txt
import xml.etree.ElementTree as ET
from urllib.parse import urlparse
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
for n in ET.parse('sitemap.xml').getroot().findall('.//s:loc',ns):
    p=urlparse(n.text).path; prefix='/Firmakroner'
    print((p[len(prefix):] if p.startswith(prefix) else p) or '/')
PY
while read -r path; do curl -fsS "http://127.0.0.1:4173${path}" >/dev/null; done < /tmp/site-paths.txt
curl -fsS http://127.0.0.1:4173/robots.txt | grep -q sitemap.xml
curl -fsS http://127.0.0.1:4173/cc4bb9dc90e3aa702484656973b7baf2.txt | grep -q cc4bb9dc90e3aa702484656973b7baf2

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"; test -n "$CHROME"
FLAGS='--headless --no-sandbox --disable-gpu --disable-dev-shm-usage --no-first-run --no-default-browser-check --virtual-time-budget=2200'
dump(){ "$CHROME" $FLAGS --dump-dom "http://127.0.0.1:4173/$1" > "$2"; }

dump '' /tmp/portal.html; grep -q 'Små virksomhedstal i almindelige kroner' /tmp/portal.html; grep -q '15 gratis værktøjer' /tmp/portal.html; grep -q 'google-site-verification' /tmp/portal.html
for href in firmakoeb.html momsregistrering-under-50000.html faktura-buffer.html udgifter-foer-opstart.html koersel-privat-bil.html telefon-internet.html reklame-eller-repraesentation.html hjemmekontor-fradrag.html kursus-eller-uddannelse-fradrag.html arbejdstoej-fradrag.html software-fra-udlandet-moms.html faktura-krav-tjek.html skal-jeg-bogfoere-digitalt-2026.html hobby-eller-erhverv.html pmv-eller-enkeltmandsvirksomhed.html satser-2026.html; do grep -q "$href" /tmp/portal.html; done

dump firmakoeb.html /tmp/purchase.html; grep -q '4.800' /tmp/purchase.html; grep -q '8.000' /tmp/purchase.html
dump '?p=10000&v=25&vr=1&vd=100&td=75&tr=40&t=asset&d=25' /tmp/legacy.html; grep -q 'Skatteestimat sat på pause' /tmp/legacy.html
dump 'firmakoeb.html?p=50000&v=25&vr=1&vd=100&td=100&tr=40&t=asset&d=25' /tmp/large.html; grep -q 'Første års afskrivning i estimat' /tmp/large.html
dump momsregistrering-under-50000.html /tmp/vat.html; grep -q '4.000' /tmp/vat.html; grep -q 'mindst 2 kalenderår' /tmp/vat.html
dump faktura-buffer.html /tmp/buffer.html; grep -q '4.200' /tmp/buffer.html; grep -q 'Du vælger selv skattebufferen' /tmp/buffer.html
dump udgifter-foer-opstart.html /tmp/startup.html; grep -q 'Muligt · skal vurderes' /tmp/startup.html; grep -q '6 måneder er ikke en automatisk godkendelse' /tmp/startup.html
dump 'udgifter-foer-opstart.html?m=3&t=establishment&u=business&d=1' /tmp/startup-no.html; grep -q 'Typisk nej' /tmp/startup-no.html
dump koersel-privat-bil.html /tmp/mileage.html; grep -q '31.520' /tmp/mileage.html; grep -q '6.720' /tmp/mileage.html
dump telefon-internet.html /tmp/phone.html; grep -q '7.800' /tmp/phone.html; grep -q '3.500' /tmp/phone.html; grep -q 'Den skattepligtige værdi beregnes kun én gang' /tmp/phone.html
dump reklame-eller-repraesentation.html /tmp/representation.html; grep -q '400,00 kr.' /tmp/representation.html; grep -q '100 %-momsregel' /tmp/representation.html
dump hjemmekontor-fradrag.html /tmp/home.html; grep -q 'Stærkt signal: typisk nej til selve rummet' /tmp/home.html; grep -q '6.000 kr.' /tmp/home.html
dump kursus-eller-uddannelse-fradrag.html /tmp/course.html; grep -q 'Stærkt signal: mulig driftsudgift' /tmp/course.html; grep -q '12.000 kr.' /tmp/course.html
dump arbejdstoej-fradrag.html /tmp/workwear.html; grep -q 'Muligt fradrag' /tmp/workwear.html; grep -q '4.000 kr.' /tmp/workwear.html
dump software-fra-udlandet-moms.html /tmp/software.html; grep -q '250 kr.' /tmp/software.html; grep -q 'Rubrik A – ydelser' /tmp/software.html; grep -q 'Reverse charge-scenario' /tmp/software.html
dump faktura-krav-tjek.html /tmp/invoice.html; grep -q 'Forenklet faktura kan bruges i dette scenario' /tmp/invoice.html; grep -q 'De nødvendige felter i denne afgrænsede case er markeret som til stede' /tmp/invoice.html
dump skal-jeg-bogfoere-digitalt-2026.html /tmp/digital.html; grep -q 'Ja — omsætningsreglen rammer dig i 2026' /tmp/digital.html; grep -q '350.000 kr.' /tmp/digital.html; grep -q '400.000 kr.' /tmp/digital.html; grep -q 'over 300.000 kr.' /tmp/digital.html; grep -q 'Reklame · reklamelink for Dinero' /tmp/digital.html; grep -q 'partner-ads.com' /tmp/digital.html
dump hobby-eller-erhverv.html /tmp/hobby.html; grep -q 'Flere stærke erhvervssignaler' /tmp/hobby.html; grep -q '40.000 kr.' /tmp/hobby.html; grep -q 'signalbillede, ikke en juridisk klassifikation' /tmp/hobby.html
dump pmv-eller-enkeltmandsvirksomhed.html /tmp/pmv.html; grep -q 'PMV kan passe til det, du har markeret' /tmp/pmv.html; grep -q 'Vigtig 50.000-kr.-nuance' /tmp/pmv.html; grep -q 'uden for EU' /tmp/pmv.html

dump satser-2026.html /tmp/rates.html; for text in '50.000 kr.' '36.000 kr.' '16.900 kr.' '3.500 kr.' '3,94 kr./km' '2,28 kr./km'; do grep -q "$text" /tmp/rates.html; done
dump affiliate.html /tmp/affiliate.html; grep -q 'aktivt affiliate-samarbejde med Dinero' /tmp/affiliate.html; grep -q 'Beregninger påvirkes aldrig' /tmp/affiliate.html; grep -q 'reklamelink for Dinero' /tmp/affiliate.html
dump privatliv.html /tmp/privacy.html; grep -q 'Partner-Ads' /tmp/privacy.html; grep -q 'trackingpixels' /tmp/privacy.html

for page in portal: purchase:firmakoeb.html vat:momsregistrering-under-50000.html buffer:faktura-buffer.html startup:udgifter-foer-opstart.html mileage:koersel-privat-bil.html phone:telefon-internet.html representation:reklame-eller-repraesentation.html homeoffice:hjemmekontor-fradrag.html course:kursus-eller-uddannelse-fradrag.html workwear:arbejdstoej-fradrag.html software:software-fra-udlandet-moms.html invoice:faktura-krav-tjek.html digital:skal-jeg-bogfoere-digitalt-2026.html hobby:hobby-eller-erhverv.html pmv:pmv-eller-enkeltmandsvirksomhed.html rates:satser-2026.html; do
  name="${page%%:*}"; path="${page#*:}"; "$CHROME" $FLAGS --window-size=390,844 --screenshot="/tmp/mobile-${name}.png" "http://127.0.0.1:4173/${path}"; test -s "/tmp/mobile-${name}.png"
done
echo 'browser/mobile smoke tests passed'
