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

Det første aktive kommercielle spor er Dinero via Partner-Ads på den kontekstuelle digital-bogføringsside. Separat virksomhedsadresse, erhvervskonto og LEI er valideringsspor, men de har ingen aktive reklamelinks. Bank/NemKonto-sporet er bevidst bygget gratis først, fordi den korrekte konklusion ofte kan være at spørge brugerens eksisterende bank eller bruge retten til basal erhvervskonto frem for at købe en ny tjeneste. LEI-sporet er tilsvarende bygget som et behovstjek før et køb: mange brugere skal slet ikke have LEI, og den konklusion må aldrig påvirkes af, at Partner-Ads aktuelt har et LEI-program. Gratis myndighedsløsninger og den korrekte “du behøver ikke købe noget”-konklusion skal altid komme før en betalt løsning. Provision må aldrig ændre et resultat.

Der er ingen analytics, cookies, login, backend eller betalte driftstjenester. Det aktive Dinero-link er et almindeligt udgående reklamelink, som først aktiveres efter brugerens samtykke; ingen Partner-Ads-script eller trackingpixel indlæses på FirmaKroner.

## Kritisk validering

Et nyt værktøj må kun overleve, hvis alle tre spørgsmål kan besvares rimeligt positivt:

1. **Målgruppe:** Findes der en konkret gruppe med problemet?
2. **Adgang:** Kan spørgsmålet realistisk findes via søgning eller en lovlig distributionskanal uden stort annoncebudget?
3. **Økonomi:** Findes der en relevant næste handling, som kan skabe indtjening uden at forringe det gratis svar?

Bank/NemKonto-checkeren overlevede denne gate, fordi søgninger om krav til erhvervskonto/NemKonto er konkrete og kommercielt relevante, men søgeresultaterne blander ofte NemKonto, bankvilkår og lovkrav sammen. Differentieringen er derfor en interaktiv, konservativ afklaring med officielle kilder — ikke endnu en banksammenligning. Eventuel monetisering må først komme efter separat programgodkendelse og produktkontrol.

LEI-checkeren overlevede samme gate, fordi problemet er meget konkret og handlingsnært: juridiske personer kan blive stoppet fra værdipapirhandel uden LEI, mens privatpersoner og almindelige enkeltmandsvirksomheder ofte ikke skal købe koden. Søgeresultaterne blander regulatoriske svar og sælgere, så FirmaKroners værdi er at afgøre behovet først med Finanstilsynet som facit. Partner-Ads viser aktuelt LEI Service DK med 120 DKK pr. lead/salg, men programmet er ikke publiceret på FirmaKroner, før selve mediet er godkendt og det udstedte link er kontrolleret. LEI Service er gennemgået som registreringsagent via RapidLEI; vi kopierer ikke deres pris-, hastigheds- eller “billigst”-påstande ind i værktøjet.

Generiske artikler og højkonkurrence-sammenligninger bygges ikke bare for at øge sidetallet.

## Budget

Projektbudget: 50 DKK totalt.  
Brugt: 0 DKK.
