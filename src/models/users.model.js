import db from '../services/db.js';
import {
  createLoginByEmail,
  updateLoginByEmail,
  deleteLoginByEmail,
} from './auth.model.js';

const createUser = async (name, email, hash) => {
  const login = await createLoginByEmail(email, hash);
  if (!login) {
    throw new Error();
  }

  const user = await db('users').insert({ name, email }).returning('*');
  return user[0];
};

const getUserById = async (id) => {
  const user = await db('users').where('id', id).first();
  return user;
};

const getUserByEmail = async (email) => {
  const user = await db('users').where('email', email).first();
  return user;
};

const updateUser = async (id, name, email) => {
  const user = await getUserById(id);

  const login = await updateLoginByEmail(user.email, email);
  if (!login) {
    throw new Error();
  }

  const result = await db('users')
    .where('id', id)
    .update({ name, email })
    .returning('*');
  return result[0];
};

const deleteUser = async (id) => {
  const user = await getUserById(id);

  const login = await deleteLoginByEmail(user.email);
  if (!login) {
    throw new Error();
  }

  const result = await db('users').where('id', id).del().returning('*');
  return result[0];
};

export { createUser, getUserById, getUserByEmail, updateUser, deleteUser };
