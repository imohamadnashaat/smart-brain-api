import bcrypt from 'bcryptjs';
import Joi from 'joi';

import db from '../services/db.js';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const handleRegister = async (data) => {
  const { error } = registerSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email, password } = data;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  let registeredUser = {};

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

    registeredUser = user[0];
  });

  return registeredUser;
};

const handleSignin = async (data) => {
  const { error } = signinSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { email, password } = data;

  const userData = await db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .first();

  if (!userData) {
    throw new Error('Login failed; Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, userData.hash);

  if (isValid) {
    const user = await db
      .select('*')
      .from('users')
      .where('email', '=', email)
      .first();

    return user;
  } else {
    throw new Error('Login failed; Invalid email or password');
  }
};

export { handleRegister, handleSignin };
