# stripe-webshop
<h1> Fläktar gött Stripe </h1>

<h3>https://github.com/TokJocke/stripe-webshop</h3>
<br>

<p> Vi har byggt en e-handel med hjälp av React, nodejs, express och integrerat Stripe som betalningsmetod. </p>

<p> För att köra projektet så behöver du navigera in i respektive mapp och köra npm install i cmd och sedan npm start för att köra igång projektet. Servern körs på port 3000 och clienten måste köras på 3001 då dessa inställningar tillåter att kakor skickas.</p>

<p>OBS! För att applikationen ska fungera krävs dessutom en ".env"- fil där variablen "STRIPE_SECRET_KEY" ska finnas och innehålla stripes hemliga nyckel.</p>


<p> På servern har vi använt oss av följande packages:  </p>
    <li>bcryptjs </li>
    <li>cookie-session </li>
    <li>cors </li>
    <li>dotenv </li>
    <li>express </li>
    <li>nodemon </li>
    <li>stripe </li>
    <li>uuidv4  </li>
<br>
<p> På clienten har vi använt oss av följande packages:</p>
    <li>Typescript</li>
    <li>React-router-dom</li>
    <li>Loader spinner</li>
    <li>Stripe</li>

<br>
<h3>Vi har siktat på VG och har uppfyllt kraven nedan: </h3>   
    <li>Ni skall bygga en simpel webshop med valfri stack</li>
    <li>Er webbshop skall ha som minst två sidor, en där produkter listas (startsida) samt en där en kundvagn finns. </li>
    <li>Det skall gå att genomföra ett köp och få en bekräftelse av att köpet genomförts.</li>
    <li>Efter verifikation ifrån Stripe att ett köp genomförts skall ordern sparas i en JSON-fil på servern. </li>
    <li>Vid verifikation att köpet är gjort skall det ej vara möjligt att en dublett av ordern sparas. i JSON-filen (kolla om ordern redan existerar i JSON-filen).</li>
    <li>Git & GitHub har använts. </li>
    <li>En användare skall inte kunna registrera sig två gånger </li>
    <li>Man skall kunna registrera sig och logga in på e-handelssidan (använd krypterad cookie som autentisering). </li>
    <li>Lösenord skall vara hashade. </li>
    <li>Man måste vara inloggad för att genomföra ett köp. </li>
    <li>Man skall som inloggad kunna hämta och lista alla köp för sin användare. </li>
    <li>Nya användare skapas som en ny Customer på Stripe. </li>
    <li>Användarnamn, lösenord och CustomerId sparas i en JSON-fil på servern. </li>
    