import express from 'express';

const app = express();

const database = {
  users: [
    {
      id: 123,
      name: 'Mohamad',
      email: 'mohamad@test.com',
      password: '123',
      entries: 0,
      joined: new Date(),
    },
    {
      id: 1234,
      name: 'Mary',
      email: 'mary@test.com',
      password: '1234',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ sucess: 'ok' });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = database.users.find((user) => {
    return user.email === email && user.password === password;
  });
  user
    ? res.status(200).json('success')
    : res.status(404).json('Login failed; Invalid email or password');
});

app.use('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: 12345,
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users.at(-1));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const user = database.users.find((user) => Number(user.id) === Number(id));
  user
    ? res.status(200).json(user)
    : res.status(404).json(`Profile with id ${id} does not exist!`);
});

export default app;
