# FirmaKroner — compliance- og auditregler

Senest revideret: 2026-08-17.

FirmaKroner skal hellere stoppe eller vise en afgrænsning end give et sikkert klingende, men fagligt forkert svar. Disse regler er en release-gate, ikke kun dokumentation.

## 1. Kilder og faglig korrekthed

- Juridiske, skatte-, moms- og bogføringsmæssige påstande skal som udgangspunkt bygge på primære officielle kilder: SKAT/Skattestyrelsen, Den juridiske vejledning, Erhvervsstyrelsen eller Virksomhedsguiden.
- Blogs, regnskabsprogrammer og andre kommercielle sider må bruges til at opdage spørgsmål, men ikke som autoritativt facit for en regel.
- Årstal, beløbsgrænser, satser og perioder skal angives med deres præcise scope.
- Hvis officielle sider ser indbyrdes inkonsistente eller forældede ud, skal værktøjet afgrænses til den regel, der kan dokumenteres sikkert. Den aktuelle lov/Den juridiske vejledning og nyere officiel vejledning vægtes højest.
- Et værktøj må ikke udlede en juridisk klassifikation, hvis de nødvendige faktiske oplysninger mangler. Det skal i stedet vise signaler, scenarier eller `uden for denne checker`.
- `rules-manifest.json` er den maskinlæsbare fortegnelse over hver offentlig regelside, dens risikoniveau, seneste faglige review, næste obligatoriske reviewdato og de primære kildedomæner, der skal være synlige på siden.

## 2. Beregninger

- Beregningslogik lægges så vidt muligt i små rene JavaScript-moduler, der kan testes uden browser.
- Numeriske grænser skal have tests lige under, præcis på og lige over grænsen, når forskellen er juridisk relevant.
- Ikke-fradragsberettiget moms skal blive i det skattemæssige omkostnings-/anskaffelsesgrundlag; momsregistrering er ikke det samme som 100 % momsfradrag.
- Hver release kører alle `*-test.js`, browser-smoke-tests og mobilrenderinger før deploy.
- Ingen eksisterende formel ændres alene for at forbedre SEO eller affiliate-konvertering.

## 3. Affiliate og markedsføring

- Et affiliate-link må først publiceres, når programmet faktisk er godkendt og det udstedte trackinglink er tilgængeligt.
- Partner-Ads oplyser selv, at reklamer/affiliatelinks først hentes efter programgodkendelse. FirmaKroners Dinero-link er det udstedte link med partner-id `57323` og banner-id `50128`.
- Kommercielle links markeres direkte og synligt som `Reklame · reklamelink for [brand]` eller tilsvarende tydeligt sprog.
- Affiliate-links bruger `rel="sponsored nofollow noopener"`.
- FirmaKroner indlæser ikke Partner-Ads-scripts, trackingpixels, iframes eller bannere før brugeren selv klikker på et reklamelink.
- Affiliateprovision må aldrig påvirke beregningsresultater, kriterier, officielle kilder eller en faglig konklusion.
- Et affiliate-link vises kun i en kontekst, hvor tjenesten er relevant for det spørgsmål, brugeren undersøger.
- Der må ikke stå eller antydes, at en bestemt kommerciel tjeneste er obligatorisk, hvis flere lovlige løsninger findes.
- `affiliate.html`, `privatliv.html`, browser-smoke og compliance-test skal holdes synkroniseret med den faktiske implementering.

## 4. Privatliv

- Ingen brugerlogin, database, analytics eller brugerprofilering indføres uden særskilt privacy-review.
- Beregningsinput skal fortsat behandles lokalt i browseren, medmindre en fremtidig funktion udtrykkeligt kræver andet og privacy-siden opdateres først.
- Eksterne links beskrives som et skift til en anden tjenestes privatlivs- og trackingpraksis.

## 5. Søgemaskiner og drift

- Google Search Console-verifikationstagget på forsiden må ikke fjernes ved senere refaktorering.
- Hver URL i `sitemap.xml` skal pege på en faktisk offentlig fil med korrekt canonical.
- Gamle delte links via `/?p=...` skal fortsat omdirigeres til `firmakoeb.html` med query-parametrene bevaret.
- Efter produktion-deploy skal den offentlige `sitemap.xml` hentes og XML-parses, før release-flowet betragtes som fuldt grønt.
- IndexNow må først køre efter en succesfuld Pages-deploy.

## 6. Faglig audit 2026-08-16/17

- **PMV:** under 50.000 kr. i momspligtig kalenderårsomsætning; præcis 50.000 kr. er ikke PMV-kompatibelt, mens den almindelige momsregistreringspligt først indtræder, når omsætningen overstiger 50.000 kr. PMV kan ikke være momsregistreret eller have ansatte, og visse udenlandske køb/handel kræver anden registrering. **Bestået efter rettelse.**
- **Frivillig momsregistrering under 50.000 kr.:** kalenderårsgrænse og minimum to kalenderårs binding ved frivillig registrering er afspejlet. **Bestået.**
- **Telefon og internet:** 2026-værdi 3.500 kr., samlet værdi ved telefon+internet samt internet-undtagelser er afspejlet konservativt. **Bestået.**
- **Privat bil:** 2026-satser 3,94 kr./km til og med 20.000 erhvervskm og 2,28 kr./km derefter, kørebog og metodevalg er afspejlet. **Bestået.**
- **Reklame/repræsentation:** restaurantcasen bruger 25 % fradrag af købsmomsen ved strengt erhvervsmæssig restaurationsydelse og derefter 25 % skattemæssigt repræsentationsfradrag af udgiften inkl. ikke-fradraget moms. **Bestået efter rettelse.**
- **Udgifter før opstart, hjemmekontor, kurser, arbejdstøj, udenlandsk SaaS, fakturakrav og hobby/erhverv:** afgrænsninger og primære kilder er dobbelttjekket. **Bestået.**
- **Digital bogføring 2026:** over 300.000 kr. i to på hinanden følgende forudgående indkomstår; præcis 300.000 kr. er ikke over; nye virksomheder kan tidligst rammes fra tredje indkomstår. **Bestået.**
- **Firmakøb 2026:** 36.000-kr.-grænsen anvendes på faktisk omkostningsgrundlag efter det momsfradrag, brugeren angiver, så ikke-fradraget moms forbliver i anskaffelsessummen. Blandet brug stopper skatteestimatet og viser 16.900-kr.-særgrænsen. 108 %-saldoen er betinget og viser førsteårs-effekt. **Bestået efter migration og rettelse.**
- **Dinero affiliate:** det udstedte Partner-Ads-link er tilgængeligt efter programgodkendelsen og vises kun kontekstuelt på digital-bogføringssiden med tydelig reklamemarkering. Dinero beskrives som ét af flere registrerede bogføringssystemer. **Bestået.**
- **Google:** Search Console-verifikation bevares i `index.html`; sitemap valideres lokalt og efter deploy. **Bestået i kode; offentlig efter-deploy-gate kræves ved hver release.**

## 7. Automatisk freshness-lock

`freshness-test.js` sammenholder `rules-manifest.json` med de offentlige regelsider i sitemap'et. En release fejler, hvis en regelside mangler i manifestet, en deklareret primær kildetype ikke længere er synlig på siden, eller reviewdatoen er udløbet. `freshness-policy-test.js` beviser desuden i CI, at 31. december 2026 stadig passerer, mens 1. januar 2027 bliver blokeret, indtil en ny faglig audit bevidst opdaterer manifestet.

Det betyder ikke, at regler automatisk er korrekte frem til udløbsdatoen. Ved en kendt regelændring skal siden genåbnes straks. Låsen er en ekstra sikkerhed mod, at 2026-tal ved et uheld bliver genudgivet som aktuelle 2027-tal.

## 8. Fortsat auditregel

En grøn auditdato er ikke permanent sandhed. Ved relevante regelændringer, årsskifte eller ny officiel vejledning skal berørte værktøjer genåbnes og genkontrolleres før næste release. Nye værktøjer må ikke nedprioritere vedligeholdelsen af de eksisterende.
