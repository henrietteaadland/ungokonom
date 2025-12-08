Prosjekt: UngØkonom – Gruppe 9
Teknologi: HTML, CSS og JavaScript

Dette dokumentet beskriver hvordan teamet skal samarbeide i GitHub. Målet er å sikre en felles arbeidsflyt slik at prosjektet utvikles strukturert, uten konflikter eller ødelagte filversjoner. Dokumentet forklarer hvorfor vi bruker bestemte metoder, hvordan branches håndteres, og hvordan Pull Requests skal brukes i praksis.

-------------------------------------------------------------------------

1. Om prosjektet og repoet

Repoet inneholder kildekoden til webapplikasjonen. All utvikling skal utføres etter faste rutiner for å holde prosjektet stabilt og oversiktlig. Prosjektet inneholder kun HTML, CSS og JavaScript.

!!!!Viktige regler!!!!

Ingen jobber direkte i main.
Én branch per oppgave.
All kode skal gjennom Pull Request.
En annen person må godkjenne PR før merging.
Brancher skal være små og oversiktlige.
Endringer skal testes før de merges.
Alle må hente oppdateringer fra main før de starter nytt arbeid.
Teamet må kommunisere godt om hvem som jobber på hva.

-------------------------------------------------------------------------

2. Branch-struktur

Vi bruker en enkel branch-modell som holder koden stabil samtidig som teamet kan jobbe parallelt.

2.1 main branch

-- main -- er den stabile og kjørbare versjonen av prosjektet. Ingen skal pushe direkte til main. All kode skal inn via Pull Requests som må godkjennes av en annen på teamet. main skal kun inneholde ferdig, testet og fungerende kode.

2.2 Branch-typer

-- Feature -- 

branches brukes når man lager ny funksjonalitet, for eksempel feature/registreringsskjema.

-- Bugfix -- 

branches brukes for å rette feil, for eksempel bugfix/fiks-validering.

-- Docs -- 

branches brukes for dokumentasjon, for eksempel docs/oppdater-readme.

-- Research -- 

branches brukes til eksperimentering og prototyper, for eksempel research/test-av-layout.

Én oppgave skal alltid tilsvare én branch.

-------------------------------------------------------------------------

3. Arbeidsflyt for utvikling

Følgende arbeidsflyt skal brukes av alle.

3.1 Før du starter

Hent alltid siste versjon av prosjektet før du begynner:

git checkout main

git pull origin main

3.2 Opprette en branch

Opprett en ny branch for oppgaven du skal jobbe med:

git checkout -b feature/navn-på-oppgave

-------------------------------------------------------------------------

3.3 Commit-process

Gjør små og hyppige commits slik at det blir lett å se hva som er gjort:

git add .

git commit -m "Beskriv kort hva som er gjort"

3.4 Push til GitHub

Når du ønsker å dele arbeidet ditt med teamet:

git push -u origin feature/navn-på-oppgave

3.5 Pull Request

Opprett en Pull Request fra din branch til main. Beskriv hva som er gjort, hvordan det testes, og hvilken Scrumwise-oppgave det gjelder. 

En annen person skal alltid godkjenne PR-en før den merges. Dette sikrer kvalitet og reduserer risiko for feil.

-------------------------------------------------------------------------

4. Merge-konflikter

Hvis du får en merge-konflikt, løses dette ved å hente siste main inn i din branch:

git checkout main

git pull

git checkout din-branch

git merge main

Git markerer konfliktene, og du løser dem manuelt før du committer igjen.

-------------------------------------------------------------------------

5. Mappestruktur

Prosjektet organiseres slik at HTML, CSS og JavaScript er tydelig separert, og slik at JavaScript kan deles opp i logiske moduler. Dette gjør det enklere å håndtere større funksjonalitet, holde koden ryddig og forstå hvilken fil som gjør hva. Et eksempel kan se slikt ut:

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
│  │        Knappestiler, kort, tabeller osv.
│  │
│  ├─ /js
│  │  ├─ main.js
│  │  │     Oppstart av applikasjonen
│  │  ├─ api.js
│  │  │     Håndtering av API-kall eller datainnhenting
│  │  ├─ calculator.js
│  │  │     Funksjoner knyttet til kalkulator eller logikk
│  │  ├─ ui.js
│  │  │     Funksjoner som oppdaterer HTML-elementer
│  │  └─ helpers.js
│  │        Gjenbrukbare hjelpefunksjoner
│  │
│  ├─ /img
│  │     Bilder og grafikk
│  │
│  └─ /components
│        ├─ header.html
│        ├─ footer.html
│        └─ card.html
│
└─ README.md

-------------------------------------------------------------------------

6. Testing lokalt

Siden prosjektet kun bruker HTML, CSS og JavaScript, kan man åpne index.html direkte i nettleseren uten server. Alternativt kan man bruke "Live Server" i VS Code.

-------------------------------------------------------------------------

7. Retningslinjer for commit-meldinger

Commit-meldinger skal være beskrivende. Eksempler på gode commit-meldinger er: "Implementerte kalkulatorlogikk", "Oppdaterte layout på forsiden", "Fikset feil i validering". Gode beskrivelser gjør det lettere for oss andre å forstå hva som er blitt gjort.

-------------------------------------------------------------------------

8. Samarbeid med Scrumwise

Hver Scrumwise-oppgave skal ha sin egen branch. Når du starter på en oppgave skal den settes til "In Progress". Når PR-en er godkjent og merget, settes oppgaven til "Done".

-------------------------------------------------------------------------

9. Viktige regler

Ingen jobber direkte i main.

Én branch per oppgave.

All kode skal gjennom Pull Request.

En annen person må godkjenne PR før merging.

Brancher skal være små og oversiktlige.

Endringer skal testes før de merges.

Alle må hente oppdateringer fra main før de starter nytt arbeid.

Teamet må kommunisere godt om hvem som jobber på hva.

-------------------------------------------------------------------------

10. Verktøy

Verktøy: GitHub, Scrumwise, VSCode
Teknologier: HTML, CSS, JavaScript
