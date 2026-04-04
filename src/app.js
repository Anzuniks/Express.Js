import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();

// CORS-konfiguraatio - sallii pyynnöt muilta alkuperistä
app.use(cors());

// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));

// Yhdistetään kaikki API-reitit /api/v1 -alkuosan alle
app.use('/api/v1', api);

app.get('/test', (req, res) => res.send('Palvelin vastaa!'));

export default app;