import db from '../services/db.js';

const createLoginByEmail = async (email, hash) => {
  const result = await db('login').insert({ email, hash }).returning('*');
  return result[0];
};

const updateLoginByEmail = async (email, newEmail) => {
  const result = await db('login')
    .where('email', email)
    .update({ email: newEmail })
    .returning('*');
  return result[0];
};

const deleteLoginByEmail = async (email) => {
  const result = await db('login').where('email', email).del().returning('*');
  return result[0];
};

const loginByEmail = async (email) => {
  const result = await db('login').where('email', email).first();
  return result;
};

const logoutByEmail = async (email) => {
  // Todo
};

const resetPasswordByEmail = async (email) => {
  // Todo
};

export {
  createLoginByEmail,
  updateLoginByEmail,
  deleteLoginByEmail,
  loginByEmail,
  logoutByEmail,
  resetPasswordByEmail,
};
