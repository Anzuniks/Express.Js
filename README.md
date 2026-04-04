# Kissa-API
[cite_start]Tämä on Express.js-pohjainen REST API, joka on rakennettu Metropolian kurssitehtävää varten.

## Asennus
1. Aja `npm install` asentaaksesi tarvittavat kirjastot.

## Käyttö
* Käynnistä kehityspalvelin: `npm run dev`
* [cite_start]Käynnistä tuotantopalvelin: `npm start` 

## Reitit
* [cite_start]`GET /api/v1/cats` - Palauttaa kissa-objektin JSON-muodossa.
* [cite_start]`GET /public/kuva.jpg` - Tarjoilee staattisen kuvan `public`-kansioista.

## Authorization Rules

- `PUT /api/v1/cats/:id`: vaatii Bearer-tokenin. Admin voi paivittaa minka tahansa kissan, tavallinen kayttaja vain omansa.
- `DELETE /api/v1/cats/:id`: vaatii Bearer-tokenin. Admin voi poistaa minka tahansa kissan, tavallinen kayttaja vain omansa.
- `PUT /api/v1/users/:id`: vaatii Bearer-tokenin. Kayttaja voi paivittaa vain oman profiilinsa, admin voi paivittaa kenen tahansa.
- `DELETE /api/v1/users/:id`: vaatii Bearer-tokenin. Kayttaja voi poistaa vain oman profiilinsa, admin voi poistaa kenen tahansa.