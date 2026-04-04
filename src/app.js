import express from 'express';
import api from './api/index.js';




const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));


// Yhdistetään kaikki API-reitit /api/v1 -alkuosan alle
app.use('/api/v1', api);

app.get('/test', (req, res) => res.send('Palvelin vastaa!'));


export default app;