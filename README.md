# TeamTODO – Smidig Prosjekt 2025

Et smidig gruppearbeid utviklet ved Høyskolen Kristiania (november 2025).  
Dette prosjektet er en enkel prototype på et **Kanban/TODO-verktøy** hvor oppgaver kan opprettes, tildeles og flyttes mellom status-kolonner.


##  Formål

Målet er å utvikle en enkel prototype som viser hvordan oppgaver kan organiseres i et smidig prosjekt ved hjelp av en Kanban-visning.  
Hver oppgave har tittel, beskrivelse, status og ansvarlig person, og flyttes automatisk mellom kolonner etter status.

---

##  Funksjonalitet

Opprett nye oppgaver  
Tildel ansvarlig gruppemedlem  
Vis oppgaver i **Kanban-visning**  
Endre status mellom “Backlog”, “Pågår” og “Ferdig”  
Automatisk synkronisering mellom liste- og tavle-visning  

---

## Teknologistack

| Type | Teknologi |
|------|------------|
| **Frontend** | HTML/CSS/JS 
| **Styling** | CSS Grid |
| **Database** | LocalStorage under utvikling)* |
| **Versjonskontroll** | GitHub |
| **Prototyping / design** | Figma |

---

## Datamodell 

```json
{
  "users": [
    { "id": "uuid", "name": "Henry", "role": "leader" }
  ],
  "tasks": [
    {
      "id": "uuid",
      "title": "Lag designskisse",
      "description": "Bruk Figma til å tegne Kanban-visning",
      "status": "Backlog",
      "assignedTo": "Henry"
    }
  ]
}

