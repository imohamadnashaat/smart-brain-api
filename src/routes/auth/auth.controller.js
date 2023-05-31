import bcrypt from 'bcryptjs';
import Joi from 'joi';
import db from '../../services/db.js';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const handleRegister = async (req, res) => {
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
      const login = await trx
        .insert({ hash: hash, email: email })
        .into('login')
        .returning('email');

      const user = await trx('users').returning('*').insert({
        name: name,
        email: login[0].email,
        joined: new Date(),
      });

      await trx.commit();

      res.status(201).json(user[0]);
    });
  } catch (err) {
    res.status(400).json('Unable to register');
  }
};

const handleSignin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    // Fetch user's email and hashed password from the database
    const data = await db
      .select('email', 'hash')
      .from('login')
      .where('email', '=', email)
      .first();

    if (!data) {
      return res.status(400).json('Login failed; Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, data.hash);

    if (isValid) {
      const user = await db
        .select('*')
        .from('users')
        .where('email', '=', email)
        .first();

      res.status(200).json(user);
    } else {
      res.status(400).json('Login failed; Invalid email or password');
    }
  } catch (err) {
    res.status(400).json('Login failed; Invalid email or password');
  }
};

export { handleRegister, handleSignin };
