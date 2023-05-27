const handleSignin = (db, bcrypt) => (req, res) => {
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
};

export { handleSignin };
