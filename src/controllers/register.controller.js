import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const handleRegister = (db, bcrypt) => async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Save user to database using a transaction
    await db.transaction(async (trx) => {
      const loginEmail = await trx
        .insert({ hash: hash, email: email })
        .into('login')
        .returning('email');

      const user = await trx('users').returning('*').insert({
        name: name,
        email: loginEmail[0].email,
        joined: new Date(),
      });

      trx.commit();
      res.status(201).json(user[0]);
    });
  } catch (err) {
    res.status(400).json('Unable to register');
  }
};

export { handleRegister };
