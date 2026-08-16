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

## 6. Senest dobbelttjekket 2026-08-16

- **PMV:** PMV er til momspligtig omsætning under 50.000 kr. pr. kalenderår. Præcis 50.000 kr. er derfor ikke PMV-kompatibelt, mens den almindelige pligt til momsregistrering først indtræder, når momspligtig omsætning overstiger 50.000 kr. PMV kan ikke være momsregistreret eller have ansatte, og særlige udenlandske køb/handel kan kræve anden registrering.
- **Digital bogføring 2026:** For de omfattede personligt ejede virksomheder er omsætningskriteriet over 300.000 kr. i to på hinanden følgende forudgående indkomstår. Præcis 300.000 kr. er ikke 'over'. En ny virksomhed kan tidligst blive omfattet fra sit tredje indkomstår.
- **Dinero-reklame:** Dinero er på Erhvervsstyrelsens fortegnelse over registrerede bogføringssystemer. FirmaKroner beskriver det som én af flere muligheder og markerer affiliate-linket tydeligt som reklame.
- **Google:** Search Console-verifikation er bevaret i `index.html`; sitemap valideres både lokalt og fremover efter deploy.

## 7. Næste auditkø

Højeste risiko først:

1. Frivillig momsregistrering under 50.000 kr. — kalenderårsregel og bindingsperiode.
2. Telefon/internet — 2026-værdi og privat rådighed.
3. Privat bil — 2026-kilometersatser, metodevalg og dokumentation.
4. Reklame/repræsentation — separat moms- og skattebehandling.
5. Firmakøb — 2026-småaktivgrænser, blandet brug og afskrivning.
6. Øvrige fradragscheckere — afgrænsning, dokumentation og momsspor.
