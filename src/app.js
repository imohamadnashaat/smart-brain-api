import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

const app = express();

const dbConfig = JSON.parse(process.env.PG_CONNECTION_STRING);
const db = knex({
  client: 'pg',
  connection: dbConfig,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ sucess: 'ok' });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // Save user to database
  db.transaction((trx) => {
    trx
      .insert({ hash: hash, email: email })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => res.status(201).json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('Unable to register'));
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            res.status(200).json(user[0]);
          })
          .catch((err) => res.status(400).json('Unable to get user'));
      } else {
        res.status(400).json('Login failed; Invalid email or password');
      }
    })
    .catch((err) =>
      res.status(400).json('Login failed; Invalid email or password')
    );
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({
      id,
    })
    .then((user) => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch((err) => res.status(400).json('Error geting profile'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .returning('*')
    .where('id', '=', id)
    .increment('entries', 1)
    .then((user) => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch((err) => res.status(400).json('Error updating entries'));
});

app.post('/clarifaiImage', (req, res) => {
  const { imageUrl } = req.body;
  const PAT = process.env.PAT;
  const USER_ID = process.env.USER_ID;
  const APP_ID = process.env.APP_ID;
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  fetch('https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error));
});

export default app;
