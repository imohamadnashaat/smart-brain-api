import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ sucess: 'ok' });
});

export default app;
