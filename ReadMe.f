# Ung økonom
Dette er en enkel webapplikasjon laget i HTML, CSS og Javascript. Løsningen består av tre sider:

- Lånekalkulator: der bruker kan fylle inn sine verdier og utifra dem få visualiseringer
- Begreper: En oversikt over økonomiske begreper
- Quiz: en enkel quiz der bruker kan teste sin kunnskap fra begreper siden

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


