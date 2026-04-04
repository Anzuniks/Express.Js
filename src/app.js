import express from 'express';
import cors from 'cors';
import api from './api/index.js';
import { notFoundHandler, errorHandler } from './middlewares/error-handlers.js';

const app = express();

// CORS-konfiguraatio - sallii pyynnöt muilta alkuperistä
app.use(cors());

// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));
app.use('/docs', express.static('docs'));

// Yhdistetään kaikki API-reitit /api/v1 -alkuosan alle
app.use('/api/v1', api);

app.get('/test', (req, res) => res.send('Palvelin vastaa!'));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;