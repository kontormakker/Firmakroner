# FirmaKroner — compliance- og auditregler

Senest revideret: 2026-08-16.

FirmaKroner skal hellere stoppe eller vise en afgrænsning end give et sikkert klingende, men fagligt forkert svar. Disse regler er en release-gate, ikke kun dokumentation.

## 1. Kilder og faglig korrekthed

- Juridiske, skatte-, moms- og bogføringsmæssige påstande skal som udgangspunkt bygge på primære officielle kilder: SKAT/Skattestyrelsen, Den juridiske vejledning, Erhvervsstyrelsen eller Virksomhedsguiden.
- Blogs, regnskabsprogrammer og andre kommercielle sider må bruges til at opdage spørgsmål, men ikke som autoritativt facit for en regel.
- Årstal, beløbsgrænser, satser og perioder skal angives med deres præcise scope. Eksempel: kalenderår er ikke det samme som rullende 12 måneder.
- Hvis officielle sider ser indbyrdes inkonsistente eller forældede ud, skal værktøjet afgrænses til den regel, der kan dokumenteres sikkert. Den aktuelle lov/Den juridiske vejledning og nyere officiel vejledning vægtes højest.
- Et værktøj må ikke udlede en juridisk klassifikation, hvis de nødvendige faktiske oplysninger mangler. Det skal i stedet vise signaler, scenarier eller 'uden for denne checker'.

## 2. Beregninger

- Beregningslogik lægges så vidt muligt i små rene JavaScript-moduler, der kan testes uden browser.
- Numeriske grænser skal have tests lige under, præcis på og lige over grænsen, når forskellen er juridisk relevant.
- Hver release kører alle `*-test.js`, browser-smoke-tests og mobilrenderinger før deploy.
- Ingen eksisterende formel ændres alene for at forbedre SEO eller affiliate-konvertering.

## 3. Affiliate og markedsføring

- Kommercielle links markeres direkte og synligt som `Reklame · reklamelink for [brand]` eller tilsvarende tydeligt sprog.
- Affiliate-links bruger `rel="sponsored nofollow noopener"`.
- FirmaKroner indlæser ikke Partner-Ads-scripts, trackingpixels, iframes eller bannere før brugeren selv klikker på et reklamelink.
- Affiliateprovision må aldrig påvirke beregningsresultater, kriterier, officielle kilder eller en faglig konklusion.
- Et affiliate-link vises kun i en kontekst, hvor tjenesten er relevant for det spørgsmål, brugeren undersøger. At en annoncør betaler provision er ikke i sig selv et relevanskriterium.
- Der må ikke stå eller antydes, at en bestemt kommerciel tjeneste er obligatorisk, hvis flere lovlige løsninger findes.
- `affiliate.html` og `privatliv.html` skal holdes synkroniseret med den faktiske implementering.

## 4. Privatliv

- Ingen brugerlogin, database, analytics eller brugerprofilering indføres uden særskilt privacy-review.
- Beregningsinput skal fortsat behandles lokalt i browseren, medmindre en fremtidig funktion udtrykkeligt kræver andet og privacy-siden opdateres først.
- Eksterne links beskrives som et skift til en anden tjenestes privatlivs- og trackingpraksis.

## 5. Søgemaskiner og drift

- Google Search Console-verifikationstagget på forsiden må ikke fjernes ved senere refaktorering.
- Hver URL i `sitemap.xml` skal pege på en faktisk offentlig fil. Nye sider skal have korrekt canonical.
- Den oprindelige `firmakoeb.html` er midlertidigt den eneste dokumenterede canonical-undtagelse, fordi den tidligere blev bevaret byte-for-byte ved portalskiftet; undtagelsen må ikke kopieres til nye sider og skal fjernes i en senere kontrolleret migration.
- Efter produktion-deploy skal den offentlige `sitemap.xml` hentes og XML-parses, før release-flowet betragtes som fuldt grønt.
- IndexNow må først køre efter en succesfuld Pages-deploy.

## 6. Faglig audit 2026-08-16

Følgende områder er dobbelttjekket mod aktuelle officielle kilder og den implementerede logik:

- **PMV:** under 50.000 kr. i momspligtig kalenderårsomsætning; præcis 50.000 kr. er ikke PMV-kompatibelt, mens den almindelige momsregistreringspligt først indtræder, når omsætningen overstiger 50.000 kr. PMV kan ikke være momsregistreret eller have ansatte, og visse udenlandske køb/handel kræver anden registrering. Status: **bestået efter rettelse**.
- **Frivillig momsregistrering under 50.000 kr.:** kalenderårsgrænsen og minimum to kalenderårs binding ved frivillig registrering er afspejlet. Status: **bestået**.
- **Telefon og internet:** 2026-værdi 3.500 kr., samlet værdi ved telefon+internet samt internet-undtagelser er afspejlet konservativt. Status: **bestået**.
- **Privat bil:** 2026-satser 3,94 kr./km til og med 20.000 erhvervskm og 2,28 kr./km derefter, kørebog og metodevalg er afspejlet. Status: **bestået**.
- **Reklame/repræsentation:** restaurantcasen er rettet. Ved strengt erhvervsmæssig restaurationsydelse bruger værktøjet 25 % fradrag af købsmomsen, ikke 100 %, og derefter 25 % skattemæssigt repræsentationsfradrag af udgiften inkl. ikke-fradraget moms. Status: **bestået efter rettelse**.
- **Udgifter før opstart:** 6 måneder behandles kun som et positivt signal, ikke automatisk godkendelse; etableringsudgifter og dokumentation holdes særskilt. Status: **bestået**.
- **Hjemmekontor:** checker er bevidst streng ved rum med privat anvendelighed og undgår automatisk huslejeprocent; inventar vurderes separat. Status: **bestået**.
- **Kurser/uddannelse:** vedligeholdelse/ajourføring af eksisterende faglig viden holdes adskilt fra nye kvalifikationer/nyt indkomstgrundlag. Status: **bestået**.
- **Arbejdstøj:** specialbeklædning, privat anvendelighed og reel merudgift holdes adskilt; moms behandles særskilt. Status: **bestået**.
- **Udenlandsk SaaS:** reverse charge, EU Rubrik A, delvis fradragsret, PMV/registreringsproblemer og faktura med udenlandsk moms er afgrænset. Status: **bestået**.
- **Fakturakrav:** fuld kontra forenklet faktura under 3.000 kr., kundens ret til fuld faktura og nødvendige felter er afgrænset til almindeligt dansk B2B. Status: **bestået**.
- **Hobby/erhverv:** værktøjet giver signaler, ikke juridisk klassifikation, og hobbyunderskud modregnes ikke i anden indkomst. Status: **bestået**.
- **Digital bogføring 2026:** over 300.000 kr. i to på hinanden følgende forudgående indkomstår; præcis 300.000 kr. er ikke over; nye virksomheder kan tidligst rammes fra tredje indkomstår. Status: **bestået**.
- **Dinero-reklame:** Dinero beskrives som ét af flere registrerede bogføringssystemer; link markeres som reklame og påvirker ikke resultatet. Status: **bestået**.
- **Google:** Search Console-verifikation bevares i `index.html`; sitemap valideres lokalt og efter deploy. Status: **bestået i kode, offentlig efter-deploy-gate afventer denne release**.

## 7. Åben højrisiko-opgave

**Firmakøb** er endnu ikke markeret fuldt bestået. De centrale 2026-grænser og almindelig afskrivning er tidligere kontrolleret, men den bevarede legacy-side skal have en kontrolleret migration, fordi:

1. den mangler canonical og er den eneste midlertidige undtagelse i compliance-gaten,
2. den indeholder ældre affiliate-status-tekst,
3. 2026-reglerne om forhøjet 108 % afskrivningsgrundlag for visse kvalificerende fabriksnye grønne driftsmidler skal enten modelleres korrekt eller tydeligt afgrænses,
4. gamle delte `/?p=...`-links og eksisterende beregninger må ikke brydes under migrationen.

Denne opgave har højere prioritet end at tilføje værktøj #16.
