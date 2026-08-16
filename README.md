# FirmaKroner

Gratis dansk værktøjsside, der oversætter små selvstændiges konkrete spørgsmål om moms, firmakøb, fradrag, CVR, bank/NemKonto, LEI og bogføring til forståelige beslutninger.

## Produktprincip

FirmaKroner konkurrerer ikke på lange generiske guides. Hver offentlig værktøjsside skal løse ét konkret spørgsmål med brugerens egne input, vise den relevante afgrænsning og linke til primære kilder.

Hvis et spørgsmål ikke kan afgøres sikkert ud fra brugerens svar, skal værktøjet vise signaler eller stoppe — ikke opfinde et facit.

## 2026-guardrails

- Standard dansk moms: 25 %.
- Småaktiver/driftsmidler kan efter SKATs generelle regel straksfradrages op til 36.000 kr. i 2026. Beregningen bruger det skattemæssige omkostningsgrundlag efter den moms, der faktisk kan fradrages; ikke-fradragsberettiget moms bliver derfor i anskaffelsessummen.
- Over grænsen bruger firmakøbs-scenariet højst 25 % årlig afskrivning.
- Delvist privat/erhvervsmæssigt benyttet udstyr har særregler. FirmaKroner stopper derfor skatteestimatet i stedet for at anvende 36.000 kr.-reglen forkert; Den juridiske vejledning angiver en særskilt 2026-grænse på 16.900 kr. for sådanne småaktiver.
- Særlige regler for bl.a. biler, grønne driftsmidler og virksomhedsordningen dækkes kun, når den konkrete side udtrykkeligt håndterer dem.

## Forretningshypotese

Gratis, søgbare beslutningsværktøjer → brugeren løser et reelt problem → kun når resultatet naturligt peger på en ekstern tjeneste, kan FirmaKroner vise et tydeligt markeret reklamelink.

De aktive kommercielle spor er Dinero og LEI Service DK via Partner-Ads. Dinero vises kun på den kontekstuelle digital-bogføringsside. LEI Service DK vises kun på LEI-checkeren, og kun når checkerens uafhængige regelresultat siger, at LEI er nødvendigt i det valgte scenario. Separat virksomhedsadresse og erhvervskonto er fortsat valideringsspor uden aktive reklamelinks.

Bank/NemKonto-sporet er bevidst bygget gratis først, fordi den korrekte konklusion ofte kan være at spørge brugerens eksisterende bank eller bruge retten til basal erhvervskonto frem for at købe en ny tjeneste. LEI-sporet er tilsvarende bygget som et behovstjek før et køb: mange brugere skal slet ikke have LEI. Den konklusion må aldrig påvirkes af provision.

Der er ingen analytics, login, backend eller betalte driftstjenester. Partner-Ads-links er almindelige udgående reklamelinks, som først aktiveres efter brugerens samtykke; ingen Partner-Ads-script, trackingpixel, iframe eller banner indlæses på FirmaKroner ved sidevisning.

## Kritisk validering

Et nyt værktøj må kun overleve, hvis alle tre spørgsmål kan besvares rimeligt positivt:

1. **Målgruppe:** Findes der en konkret gruppe med problemet?
2. **Adgang:** Kan spørgsmålet realistisk findes via søgning eller en lovlig distributionskanal uden stort annoncebudget?
3. **Økonomi:** Findes der en relevant næste handling, som kan skabe indtjening uden at forringe det gratis svar?

Bank/NemKonto-checkeren overlevede denne gate, fordi søgninger om krav til erhvervskonto/NemKonto er konkrete og kommercielt relevante, men søgeresultaterne blander ofte NemKonto, bankvilkår og lovkrav sammen. Differentieringen er derfor en interaktiv, konservativ afklaring med officielle kilder — ikke endnu en banksammenligning. Eventuel monetisering må først komme efter separat programgodkendelse og produktkontrol.

LEI-checkeren overlevede samme gate, fordi problemet er meget konkret og handlingsnært: juridiske personer kan blive stoppet fra værdipapirhandel uden LEI, mens privatpersoner og almindelige enkeltmandsvirksomheder ofte ikke skal købe koden. FirmaKroners værdi er at afgøre behovet først med Finanstilsynet som facit. Det udstedte LEI Service DK-link er partner-id `57323`, banner-id `85033`; det aktiveres kun efter samtykke og kun når resultatet kræver LEI. FirmaKroner kopierer ikke udbyderens pris-, hastigheds- eller “billigst”-påstande ind i værktøjet.

Generiske artikler og højkonkurrence-sammenligninger bygges ikke bare for at øge sidetallet.

## Budget

Projektbudget: 50 DKK totalt.  
Brugt: 0 DKK.
