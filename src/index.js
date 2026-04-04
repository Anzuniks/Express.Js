import app from './app.js';
import catRouter from './api/routes/cat-router.js';
import userRouter from './api/routes/user-router.js';

const port = 3000;

// Reitit (Routes) - nämä pitää olla ennen app.listenia
app.use('/api/cats', catRouter);
app.use('/api/users', userRouter);

// Käynnistetään palvelin
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});