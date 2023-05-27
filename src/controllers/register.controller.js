const handleRegister = (db, bcrypt) => (req, res) => {
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
};

export { handleRegister };
