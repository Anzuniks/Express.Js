import express from 'express';

import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.send('Tervetuloa Kissa API:iin!');
});

app.get('/api/v1/cats', (req, res) => {
    const cats = {
        cat_id: 1,
        name: 'Misu',
        birthday: '2020-01-01',
        weight: 4.5,
        owner: "Omistaja",
        image: 'http://localhost:3000/public/image.jpg'
    };
    res.json(cats);
});

app.listen(port, () => {
    console.log(`Kissa API on käynnissä portissa ${port}`);
});  