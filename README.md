
# Prosjekt: UngØkonom – Gruppe 9
Teknologi: HTML, CSS og JavaScript

Dette dokumentet beskriver hvordan teamet skal samarbeide i GitHub. Målet er å sikre en felles arbeidsflyt slik at prosjektet utvikles strukturert, uten konflikter eller ødelagte filversjoner. Dokumentet forklarer hvorfor vi bruker bestemte metoder, hvordan branches håndteres, og hvordan Pull Requests skal brukes i praksis.

---

## 1. Om prosjektet og repoet
Repoet inneholder kildekoden til webapplikasjonen. All utvikling skal utføres etter faste rutiner for å holde prosjektet stabilt og oversiktlig.

### Viktige regler
- Ingen jobber direkte i main.
- Én branch per oppgave.
- All kode skal gjennom Pull Request.
- En annen person må godkjenne PR før merging.
- Brancher skal være små og oversiktlige.
- Endringer skal testes før de merges.
- Alle må hente oppdateringer fra main før de starter nytt arbeid.
- Teamet må kommunisere godt om hvem som jobber på hva.

---

## 2. Branch-struktur
Vi bruker en enkel branch-modell som holder koden stabil samtidig som teamet kan jobbe parallelt.

### 2.1 main branch
main er den stabile og kjørbare versjonen av prosjektet. Ingen skal pushe direkte til main. All kode skal inn via Pull Requests som godkjennes av en annen på teamet.

### 2.2 Branch-typer
Feature – eksempel: feature/registreringsskjema  
Bugfix – eksempel: bugfix/fiks-validering  
Docs – eksempel: docs/oppdater-readme  
Research – eksempel: research/test-av-layout  

Én oppgave skal alltid tilsvare en branch.

---

## 3. Arbeidsflyt for utvikling

### 3.1 Før du starter
Hent alltid siste versjon av prosjektet:

```
git checkout main
git pull origin main
```

### 3.2 Opprette en branch
```
git checkout -b feature/navn-på-oppgave
```

### 3.3 Commit-prosess
```
git add .
git commit -m "Beskriv kort hva som er gjort"
```

### 3.4 Push til GitHub
```
git push -u origin feature/navn-på-oppgave
```

### 3.5 Pull Request
Opprett en Pull Request fra din branch til main. Beskriv hva som er gjort, hvordan det testes, og hvilken Scrumwise-oppgave det gjelder. En annen person må godkjenne PR før merging.

---

## 4. Merge-konflikter
Hvis du får en merge-konflikt:

```
git checkout main
git pull
git checkout din-branch
git merge main
```

Git markerer konfliktene, og du løser dem manuelt før du committer igjen.

---

## 5. Mappestruktur

Prosjektet organiseres slik at HTML, CSS og JavaScript er tydelig separert.

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
```

---

## 6. Testing lokalt
Åpne index.html direkte i nettleseren, eller bruk Live Server i VS Code.

---

## 7. Retningslinjer for commit-meldinger
Eksempler på gode commit-meldinger:
- Implementerte kalkulatorlogikk
- Oppdaterte layout på forsiden
- Fikset feil i validering

---

## 8. Samarbeid med Scrumwise
- Hver oppgave skal ha sin egen branch.
- Sett oppgaven til In Progress når du starter arbeidet.
- Sett oppgaven til Done når PR er godkjent og merget.

---

## 9. Viktige regler (oppsummering)
- Ingen jobber direkte i main.
- Én branch per oppgave.
- All kode skal gjennom Pull Request.
- En annen person må godkjenne PR før merging.
- Brancher skal være små og oversiktlige.
- Endringer skal testes før de merges.
- Alle må hente oppdateringer fra main før de starter nytt arbeid.
- Teamet må kommunisere godt om hvem som jobber på hva.

---

## 10. Verktøy
GitHub  
Scrumwise  
VS Code  

Teknologier: HTML, CSS, JavaScript
