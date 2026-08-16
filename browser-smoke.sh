#!/usr/bin/env bash
set -euo pipefail

python3 -m http.server 4173 --directory _site >/tmp/firmakroner-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for i in {1..20}; do
  if curl -fsS http://127.0.0.1:4173/ >/dev/null; then break; fi
  sleep 0.25
done

python3 - <<'PY' > /tmp/site-paths.txt
import xml.etree.ElementTree as ET
from urllib.parse import urlparse
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
for node in ET.parse('sitemap.xml').getroot().findall('.//s:loc',ns):
    p=urlparse(node.text).path
    prefix='/Firmakroner'
    p=p[len(prefix):] if p.startswith(prefix) else p
    print(p or '/')
PY
while read -r path; do curl -fsS "http://127.0.0.1:4173${path}" >/dev/null; done < /tmp/site-paths.txt
curl -fsS http://127.0.0.1:4173/cc4bb9dc90e3aa702484656973b7baf2.txt | grep -q 'cc4bb9dc90e3aa702484656973b7baf2'
curl -fsS http://127.0.0.1:4173/robots.txt | grep -q 'sitemap.xml'
curl -fsS http://127.0.0.1:4173/sitemap.xml | grep -q 'software-fra-udlandet-moms.html'

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME"
FLAGS='--headless --no-sandbox --disable-gpu --disable-dev-shm-usage --no-first-run --no-default-browser-check --virtual-time-budget=2200'

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/' > /tmp/portal.html
grep -q 'Små virksomhedstal i almindelige kroner' /tmp/portal.html
for href in firmakoeb.html momsregistrering-under-50000.html faktura-buffer.html udgifter-foer-opstart.html koersel-privat-bil.html telefon-internet.html reklame-eller-repraesentation.html hjemmekontor-fradrag.html kursus-eller-uddannelse-fradrag.html arbejdstoej-fradrag.html software-fra-udlandet-moms.html satser-2026.html; do
  grep -q "$href" /tmp/portal.html
done

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/firmakoeb.html' > /tmp/purchase.html
grep -q '4.800' /tmp/purchase.html
grep -q '8.000' /tmp/purchase.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/?p=10000&v=25&vr=1&vd=100&td=75&tr=40&t=asset&d=25' > /tmp/legacy-share.html
grep -q 'Skatteestimat sat på pause' /tmp/legacy-share.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/firmakoeb.html?p=50000&v=25&vr=1&vd=100&td=100&tr=40&t=asset&d=25' > /tmp/large.html
grep -q 'Første års afskrivning i estimat' /tmp/large.html
grep -q '36.000 kr.-grænsen' /tmp/large.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/momsregistrering-under-50000.html' > /tmp/vat-choice.html
grep -q '4.000' /tmp/vat-choice.html
grep -q 'økonomisk dårligere' /tmp/vat-choice.html
grep -q 'mindst 2 kalenderår' /tmp/vat-choice.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/faktura-buffer.html' > /tmp/invoice-buffer.html
grep -q '4.200' /tmp/invoice-buffer.html
grep -q '2.500' /tmp/invoice-buffer.html
grep -q 'Du vælger selv skattebufferen' /tmp/invoice-buffer.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/udgifter-foer-opstart.html' > /tmp/startup-default.html
grep -q 'Muligt · skal vurderes' /tmp/startup-default.html
grep -q '6 måneder er ikke en automatisk godkendelse' /tmp/startup-default.html
"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/udgifter-foer-opstart.html?m=3&t=establishment&u=business&d=1' > /tmp/startup-establishment.html
grep -q 'Typisk nej' /tmp/startup-establishment.html
"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/udgifter-foer-opstart.html?m=7&t=operating&u=business&d=1' > /tmp/startup-old.html
grep -q 'Svagere signal' /tmp/startup-old.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/koersel-privat-bil.html' > /tmp/mileage.html
grep -q '31.520' /tmp/mileage.html
grep -q '24.800' /tmp/mileage.html
grep -q '6.720' /tmp/mileage.html
grep -q 'kun kan skiftes opgørelsesprincip én gang' /tmp/mileage.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/telefon-internet.html' > /tmp/phone-internet.html
grep -q '7.800' /tmp/phone-internet.html
grep -q '3.500' /tmp/phone-internet.html
grep -q '4.300' /tmp/phone-internet.html
grep -q '1.720' /tmp/phone-internet.html
grep -q 'Den skattepligtige værdi beregnes kun én gang' /tmp/phone-internet.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/reklame-eller-repraesentation.html' > /tmp/representation.html
grep -q '400,00 kr.' /tmp/representation.html
grep -q '100 %-momsregel' /tmp/representation.html
grep -q 'Skattefradraget er begrænset til 25 %' /tmp/representation.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/hjemmekontor-fradrag.html' > /tmp/home-office.html
grep -q 'Stærkt signal: typisk nej til selve rummet' /tmp/home-office.html
grep -q '6.000 kr.' /tmp/home-office.html
grep -q 'Ingen falsk huslejeberegning' /tmp/home-office.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/kursus-eller-uddannelse-fradrag.html' > /tmp/course.html
grep -q 'Stærkt signal: mulig driftsudgift' /tmp/course.html
grep -q '12.000 kr.' /tmp/course.html
grep -q '“Muligt” er ikke “godkendt”' /tmp/course.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/arbejdstoej-fradrag.html' > /tmp/workwear.html
grep -q 'Muligt fradrag' /tmp/workwear.html
grep -q '4.000 kr.' /tmp/workwear.html
grep -q 'Moms er en separat vurdering' /tmp/workwear.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/software-fra-udlandet-moms.html' > /tmp/foreign-software.html
grep -q '250 kr.' /tmp/foreign-software.html
grep -q 'Netto momsbelastning' /tmp/foreign-software.html
grep -q '>0 kr.<' /tmp/foreign-software.html
grep -q 'Rubrik A – ydelser' /tmp/foreign-software.html
grep -q 'Reverse charge-scenario' /tmp/foreign-software.html
echo 'foreign software smoke ok'

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/satser-2026.html' > /tmp/rates.html
grep -q '50.000 kr.' /tmp/rates.html
grep -q '36.000 kr.' /tmp/rates.html
grep -q '16.900 kr.' /tmp/rates.html
grep -q '3.500 kr.' /tmp/rates.html
grep -q '3,94 kr./km' /tmp/rates.html
grep -q '2,28 kr./km' /tmp/rates.html

"$CHROME" $FLAGS --dump-dom 'http://127.0.0.1:4173/affiliate.html' > /tmp/affiliate.html
grep -q 'endnu ingen aktive affiliate-links' /tmp/affiliate.html
grep -q 'Beregninger påvirkes aldrig' /tmp/affiliate.html

for page in portal: purchase:firmakoeb.html vat:momsregistrering-under-50000.html buffer:faktura-buffer.html startup:udgifter-foer-opstart.html mileage:koersel-privat-bil.html phone:telefon-internet.html representation:reklame-eller-repraesentation.html homeoffice:hjemmekontor-fradrag.html course:kursus-eller-uddannelse-fradrag.html workwear:arbejdstoej-fradrag.html software:software-fra-udlandet-moms.html rates:satser-2026.html; do
  name="${page%%:*}"; path="${page#*:}"
  "$CHROME" $FLAGS --window-size=390,844 --screenshot="/tmp/mobile-${name}.png" "http://127.0.0.1:4173/${path}"
  test -s "/tmp/mobile-${name}.png"
done
echo 'browser/mobile smoke tests passed'
