OPPSETT FOR DATABASE OG BACKEND

Databasen kjøres i en Docker container som definert i filen "docker-compose.yml"   <--- Filen ligger i root mappen

Oppsettet:
  -Starter en PostgreSQL 16-container
  -Setter brukernavn, passord og databaenavn via miljøvariabler
  -Eksponerer databasen på port 5433
  -Bruker docker-volume /pgdata( for persistering av data 

  Databaen startes fra root mappen med kommandoene:
  
  1. "docker compose up -d"
     -Databasen vil da bli tilgjengelig på "localhost:5433"

  2. Databasen stopped med:
     - "docker compose down"
    
  3. Full reset (stopper og sletter all lagret data i PostGreSQL)
     - "docker compose down -v"
     -  "docker compose up -D
    


  Backend Oppsett - Hvordan starte backend

  1. Gå inn i backend mappen
  2. "npm install"
  3. "npm start"
  4. Når backend kjører, er API tilgjengeli på --> localhost:3000" // Backend er bygget ved bruk av Express og blir et bindeledd mellom front-end og databasen


Koble til databasen manuelt (VALGFRITT)
for feilsøking eller simpelthen for manuell verisifering kan man koble seg direkte til databasen
  1. "docker exec -it ungokonom-db-1 psql -U ungokonom -d ungokonom"
  2. Avslutter psql med: "\q"



Databaestruktur - Brukerhåndtering
Applikasjonen benytter en tabell kalt "users" for autentisering og kontoadministrasjon
Tabellen gir støtte for følgende funksjoner:
 -Registrering
 -Innlogging
 -Deaktivering av konto
 -Sletting av konto
 -Endring av passord

 Opprett tabellen manuelt ved å skrive følgende i terminalen i docker PostGreSQL
 
 "CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
active BOOLEAN NOT NULL DEFAULT TRUE
);"





Arkitektur oversikt:
- Front-End: HTML/CSS/JS (Blir kjørt i nettleser)
- Backend: Node.Js & Express (API)
- Database: PostgreSQL i Docker
- Kommunikasjon: REST API /api/login, /api/register, osv..
