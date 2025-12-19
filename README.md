# Prosjekt: UngØkonom – Gruppe 9
Teknologi: HTML, CSS og JavaScript

Dette dokumentet beskriver hvordan teamet skal samarbeide i GitHub. Målet er å sikre en tydelig og strukturert arbeidsflyt som sørger for at prosjektet utvikles uten unødvendige konflikter, feil eller ødelagte versjoner av filer. Dokumentet forklarer hvorfor vi benytter bestemte metoder, hvordan branches brukes, og hvordan Pull Requests skal håndteres i praksis.

---

## 1. Om prosjektet og repoet

Repoet inneholder kildekoden til webapplikasjonen UngØkonom. For å sikre et ryddig og bærekraftig samarbeid i teamet følger prosjektet faste rutiner for commit-struktur, branching, testing og kvalitetssikring. Siden prosjektet kun består av HTML, CSS og JavaScript, er det viktig at alle på teamet arbeider på en måte som gjør det lett å forstå hvor logikk, struktur og styling ligger.

### Viktige regler

For å sikre at prosjektet holdes stabilt, gjelder følgende regler for hele teamet:

- Ingen skal jobbe direkte i main-branch.
- Én branch per oppgave.
- All kode skal gjennom en Pull Request.
- En annen person enn den som har skrevet koden må godkjenne PR-en før merging.
- Brancher skal være små, avgrensede og oversiktlige.
- Endringer skal testes før de merges.
- Alle skal hente siste versjon av main før de starter arbeidet sitt.
- Teamet skal kommunisere hvem som jobber på hva for å unngå overlapp og konflikter.

Disse prinsippene bidrar til kvalitetssikring, forutsigbarhet og bedre samarbeid innad i teamet.

---

## 2. Branch-struktur

Vi benytter en enkel, men effektiv branch-modell som gjør det mulig for teamet å jobbe parallelt uten å skape unødvendige konflikter.

### 2.1 main branch

main er den stabile og kjørbare versjonen av prosjektet. Ingen skal pushe direkte til main. All kode skal gå via Pull Requests som er godkjent av minst én annen teammedlem. Dette sikrer høy kvalitet og at ikke feil sniker seg inn i prosjektet.

### 2.2 Typer branches

Ulike typer branches brukes for forskjellige formål. Dette gjør det tydelig hva en branch inneholder og hva den skal brukes til.

- Feature-branches: brukes når man utvikler ny funksjonalitet.  
  Eksempel: feature/registreringsskjema

- Bugfix-branches: brukes når man skal rette feil i eksisterende kode.  
  Eksempel: bugfix/fiks-validering

- Docs-branches: brukes for oppdatering av dokumentasjon.  
  Eksempel: docs/oppdater-readme

- Research-branches: brukes når man ønsker å teste, eksperimentere eller undersøke løsninger som ikke er klar for produksjon.  
  Eksempel: research/test-av-layout

Én branch skal alltid tilsvare én oppgave i Scrumwise.

---

## 3. Arbeidsflyt for utvikling

Denne arbeidsflyten skal brukes av alle for å sikre strukturert utvikling.

### 3.1 Før du starter

Før du begynner på nytt arbeid, må du alltid hente siste versjon av prosjektet:

```
git checkout main
git pull origin main
```

Dette hindrer at du bygger videre på en utdatert versjon.

### 3.2 Opprette en branch

Når du starter en ny oppgave, oppretter du en egen branch for denne:

```
git checkout -b feature/navn-på-oppgave
```

### 3.3 Commit-prosess

Commit ofte og i små enheter slik at det blir enkelt å forstå hva som er endret:

```
git add .
git commit -m "Kort og presis beskrivelse av hva som er gjort"
```

### 3.4 Push til GitHub

Når du ønsker å laste opp arbeidet ditt:

```
git push -u origin feature/navn-på-oppgave
```

### 3.5 Pull Request

Når du er ferdig med oppgaven eller ønsker tilbakemelding:

- Opprett en Pull Request fra din branch til main.
- Beskriv tydelig hva som er gjort, hvordan det kan testes, og hvilken Scrumwise-oppgave det gjelder.
- En annen person må godkjenne PR-en før merging.

Dette sikrer kvalitet og felles eierskap til koden.

---

## 4. Merge-konflikter

Når flere jobber på samme prosjekt samtidig, kan merge-konflikter oppstå. Hvis dette skjer, gjør du følgende:

```
git checkout main
git pull
git checkout din-branch
git merge main
```

Git vil markere konfliktene – disse må du løse manuelt. Deretter committer du endringene og fortsetter arbeidet.

---

## 5. Mappestruktur

Prosjektet organiseres slik at HTML, CSS og JavaScript er tydelig separert, og slik at JavaScript kan deles inn i logiske moduler. Målet er å gjøre det enklere å navigere i prosjektet, holde koden organisert og forstå hva hver fil gjør. Dette er spesielt viktig når flere personer jobber i samme kodebase.

Eksempel på struktur:

```
/
├─ index.html

├─ /assets
│
│  ├─ /css
│  │  ├─ base.css
│  │  │     Grunnleggende styling (reset, typografi)
│  │  ├─ layout.css
│  │  │     Oppsett av sider, seksjoner og grids
│  │  └─ components.css
│  │        Styling for komponenter som knapper, kort, tabeller osv.
│  │
│  ├─ /js
│  │  ├─ main.js
│  │  │     Initialisering av applikasjonen
│  │  ├─ api.js
│  │  │     Håndtering av datainnhenting eller API-kall
│  │  ├─ calculator.js
│  │  │     Logikk knyttet til kalkulatorfunksjoner
│  │  ├─ ui.js
│  │  │     Funksjoner som oppdaterer HTML-elementer
│  │  └─ helpers.js
│  │        Gjenbrukbare hjelpefunksjoner
│  │
│  ├─ /img
│  │     Bilder og grafikk brukt i applikasjonen
│  │
│  └─ /components
│        ├─ header.html
│        ├─ footer.html
│        └─ card.html
│
└─ README.md
```

Denne strukturen gjør det enkelt å lokalisere både funksjonalitet og styling, og hjelper prosjektet å skaleres uten at mappene blir uoversiktlige.

---

## 6. Testing lokalt

Ettersom prosjektet kun består av HTML, CSS og JavaScript, kan du åpne index.html direkte i nettleseren for å teste. Alternativt kan du bruke Live Server i Visual Studio Code for en mer effektiv arbeidsflyt.

---

## 7. Retningslinjer for commit-meldinger

Commit-meldinger skal være tydelige og forklarende. Gode commit-meldinger gjør det enklere å forstå prosjektets historikk og gir bedre samarbeid. Eksempler:

- Implementerte kalkulatorlogikk.
- Oppdaterte layout på forsiden.
- Fikset feil i validering.

---

## 8. Samarbeid med Scrumwise

Scrumwise brukes til å holde oversikt over oppgaver. Hver oppgave skal ha en egen branch i GitHub. Når du starter på en oppgave, settes status til In Progress. Når Pull Request er godkjent og endringene er merget, settes oppgaven til Done.

---

## 9. Oppsummering av viktige regler

- Ingen jobber direkte i main.
- Én branch per oppgave.
- All kode skal gjennom Pull Request.
- En annen person må godkjenne PR før merging.
- Brancher skal være små og oversiktlige.
- Endringer skal testes før de merges.
- Alle oppdaterer main før de starter nytt arbeid.
- Kommunikasjon er viktig for å unngå dobbeltarbeid.

---
## 10. Verktøy

- GitHub
- Scrumwise
- VS Code

Teknologier: HTML, CSS, JavaScript.

---

# Ung økonom

Oppsett for database

I tillegg til fronten (HTML/CSS/JS) er applikasjonen satt opp med en database for brukerhåndtering

## Database - PostgreSQL i Docker

databasen kjøres i en Docker-container som er i filen docker-compose.yml i rotmappen på prosjektet

**Oppsette i Docker gjør følgende**
- Starter en **PostgreSQL 16** -container
- Setter brukernavn og passord via miljøvariabler
- eksponerer databasene på port **5433** 

Kan enkelt kjøre hele applikasjonen med å kjøre scriptet setup.ps1 fra root mappen
 kommandoen: "./setup.ps1"



**Starte/stoppe og resete databasen**
1. starter fra root mappen:
   - Med kommandoen "docker compse up -d"
2. Stoppes med:
   - "docker compose down"
3. Full reset
   - Dette stopper container og sletter lagret data
   - docker compose down -v
   - docker compose up -d

## Teknologier som er brukt
- HTML: struktur for applikasjonen
- CSS: styling, layout, farger osv
- Javascript: for interaktivitet
            - vise grafer og kalkulering 
            - åpne/lukke forklaringer på begreper
            - generering av quiz spørsmål, svar alternativer og poengregning


## Krav til utviklingsmiljø
For å kjøre og videreutvikle løsningen trengs følgende:

- en nettleser (f.eks chrome, google, firefox osv)
- en kodeeditor, for eksempel:
  - [visual studio code] (anbefalt)
  - **live server** for å kjøre koden lokalt med god refresh


## Hvordan kjøre prosjektet lokalt
1. **Last ned prosjektet**
   - Last ned som zip fra Github og pakk ut.
2. **åpne i visual studip code**
   - åpne mappene der scripts ligger
3. **Start**
   - åpne med live server ved å høyre klikke på en html script.
4. **Navigasjon**
   - øverst på siden ligger det en felles meny for å navigere rundt.

## Funksjonalitet


Dette er en enkel webapplikasjon laget i HTML, CSS og Javascript. Løsningen består av tre sider:

- Lånekalkulator: der bruker kan fylle inn sine verdier og utifra dem få visualiseringer
- Begreper: En oversikt over økonomiske begreper
- Quiz: en enkel quiz der bruker kan teste sin kunnskap fra begreper siden

---
## Lånekalkulator (loan-calc)

Lånekalkulatoren er kjernen i løsningen og er utviklet som en interaktiv frontend-kalkulator i HTML, CSS og JavaScript.  
Formålet er å gi brukeren bedre forståelse av hvordan endringer i sentrale økonomiske valg påvirker kostnader over tid.

Alle beregninger skjer lokalt i nettleseren, uten lagring av data.



### Boliglån – egenandel og rente

For boliglån kan brukeren:

- legge inn kjøpesum, egenandel, rente og nedbetalingstid
- justere egenandel og rente for å se hvordan:
  - månedskostnaden endres
  - totale lånekostnader påvirkes over tid
- sammenligne ulike scenarioer for å forstå konsekvensene av valgene

Dette gjør det mulig å se hvordan selv små endringer i rente eller egenandel kan få stor betydning for totaløkonomien.



### Billån – kostnader utover selve lånet

Ved valg av billån utvides kalkulatoren med kostnader knyttet til det å eie bil, i tillegg til selve lånet.

Brukeren kan:

- beregne lånekostnader for billån
- legge inn og justere løpende bilkostnader, som for eksempel:
  - drivstoff eller strøm
  - forsikring
  - vedlikehold
  - andre faste månedlige kostnader
- se total månedskostnad for bil, hvor både lån og øvrige kostnader inngår

Dette tydeliggjør at lånet kun er en del av biløkonomien, og at faste kostnader kan utgjøre en betydelig del av totalutgiftene.



### Visualisering og interaktivitet

- Resultater vises gjennom grafer og oppsummeringer
- Endringer i brukerens input oppdaterer tall og visualiseringer fortløpende
- Kalkulatoren er bygget stegvis for å gjøre komplekse økonomiske valg mer oversiktlige



### Avgrensninger

- Kalkulatoren er ment som et pedagogisk verktøy
- Resultatene er veiledende og ikke ment som eksakte bankberegninger
- Løsningen har:
  - ingen innlogging
  - ingen lagring av data
  - ingen backend- eller databasekobling

---

### Begreper (info.html i vscode)

- Viser titel, introduksjon og dato.
- begreper du må kunne.
- begreper grupert alafabetisk (A, B, D, E, F osv)
- for hvert bokstav
  - En stor bokstav til venstre
  - Til høyre for store bokstav ligger et kort med begrep
  - Bruker trykker på et begrep så åpnes det begrepet med en definisjon.

Interaktivitet som åpne/lukke begreper styres av en Javascript kode (accordion.js) som gjør følgende:
- følger med på klikk (.bare-header).
- CSS foor toggling (.open) på begreper.

### Quiz  (Quiz.html)

- Titel: **Test kunnskapen din**.
- Selve quiz: i container (.quiz.js)
- Spørsmål genereres fra quiz.js koden
- Hvert spørsmål har:
   - Question: spørsmålet
   - Options: en liste med tre alternativer
   - Riktig svar: CorrectIndex brukt for å se riktig svar
- Når bruker trykker et et svar:
   - Riktig svar = grønn.
   - Feil svar = rød.
   - Etter klikk deaktiveres onclick for spørsmålet
   - Poengsummen nederst oppdateres ette klikk

Det er også en **Start på nytt** knapp som starter quizen på nytt

- GitHub
- Scrumwise
- VS Code

Teknologier: HTML, CSS, JavaScript.
