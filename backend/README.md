Lokal kjøring av database og backend

prosjektet bruker PostgreSQL i Docker for lokal utvikling. Hensikten er at alle på gruppen skal ha samme databaseoppsett uavhengig av operativsystem eller maskin. (slipper, det funker på min maskin problemet)

For å kjøre prosjektet lokalt må Docker Desktop være installert, samt Node.js. Node-versjon kan sjekkes med "node -v".

Databasen startes fra rootmappen i prosjektet ved å kjøre "docker compose up -d". Dette starter en PostgreSQL-database lokalt på "localhost:5433".

For å sette opp backend går man inn i backend-mappen med "cd backend" og installerer nødvendigheter med "npm install"

Miljøvariabler settes opp ved å kopiere eksempel-filen med "cp .env.example .env". Denne filen inneholder database-tilkobling og port, og skal ikke committes til Git.

Backend startes med "npm start". Når backend kjører, er den tilgjengelig på "http://localhost:3000
"

Det er også mulig å koble seg direkte til databasen via Docker for å verifisere innhold eller opprette tabeller. Dette gjøres med "docker exec -it ungokonom-db-1 psql -U ungokonom -d ungokonom".

For brukerhåndtering benyttes en tabell kalt users. Tabellen kan opprettes med kommandoen
"CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL );"

Når man er ferdig i databasen avsluttes psql med "\q".

Databasen stoppes med "docker compose down". Dersom man ønsker å stoppe databasen og samtidig slette all lagret data (full reset), brukes "docker compose down -v" etterfulgt av "docker compose up -d".