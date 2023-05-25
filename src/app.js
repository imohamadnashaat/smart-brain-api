import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();

const database = {
  users: [
    {
      id: 123,
      name: 'Mohamad',
      email: 'mohamad@test.com',
      password: '$2a$10$dAQLKJmJCXfkpoU6NSpJoujUtPMQtrqeBK3aez0/vUj/IydQLGm6.',
      entries: 0,
      joined: new Date(),
    },
    {
      id: 1234,
      name: 'Mary',
      email: 'mary@test.com',
      password: '$2a$10$K6tfH6iUiCiWwMqEI6YR7utTpJoMh89vBngOi1AaQjXyNo.ZL/.5O',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ sucess: 'ok' });
});

app.use('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Hash the password before save it
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = {
    id: 12345,
    name,
    email,
    password: hash,
    entries: 0,
    joined: new Date(),
  };
  // Save user
  database.users.push(user);
  res.json(user);
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  // Check email
  const user = database.users.find((user) => user.email === email);
  if (user) {
    // Check password
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.status(200).json(user);
      } else {
        res.status(404).json('Login failed; Invalid email or password');
      }
    });
  } else {
    res.status(404).json('Login failed; Invalid email or password');
  }
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const user = database.users.find((user) => Number(user.id) === Number(id));
  user
    ? res.status(200).json(user)
    : res.status(404).json(`Profile with id ${id} does not exist!`);
});

export default app;
