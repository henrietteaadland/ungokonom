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
