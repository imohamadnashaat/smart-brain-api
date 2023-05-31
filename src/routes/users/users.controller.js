import Joi from 'joi';
import db from '../../services/db.js';

const userIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const handleUsersGet = async (req, res) => {
  try {
    const users = await db.select('*').from('users');
    return res.json(users);
  } catch (err) {
    res.status(400).json('Error getting users');
  }
};

const handleUsersByIdGet = async (req, res) => {
  try {
    const { error } = userIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;

    const user = await db
      .select('*')
      .from('users')
      .where('id', '=', id)
      .first();

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json('Not found');
    }
  } catch (err) {
    res.status(400).json('Error getting profile');
  }
};

export { handleUsersGet, handleUsersByIdGet };
