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

## Error Handling and Validation

- Sovellus kayttaa keskitettyja error-handlereita tiedostosta `src/middlewares/error-handlers.js`.
- `notFoundHandler` palauttaa JSON-virheen kaikille tuntemattomille reiteille.
- `errorHandler` palauttaa virheet aina JSON-muodossa: `{ error: { message, status } }`.
- Validointi toteutetaan `express-validator`-kirjastolla reititasolla.

### Validation rules

- `POST /api/v1/users`
	- `email`: validi email
	- `username`: 3-20 merkki, alfanumeerinen
	- `password`: min 8 merkkiä
	- `name`: 2-50 merkkiä
- `POST /api/v1/cats`
	- `cat_name`: 3-50 merkkiä
	- `weight`: numero, > 0
	- `birthdate`: validi ISO8601 paivamaara
	- `file`: pakollinen, max 10 MB, vain image/video MIME-tyypit