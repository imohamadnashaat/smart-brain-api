import Joi from 'joi';

const imageIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const handleImageGet = (db) => async (req, res) => {
  try {
    const { error } = imageIdSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.body;

    const [user] = await db('users')
      .returning('*')
      .where('id', '=', id)
      .increment('entries', 1);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json('Not found');
    }
  } catch (err) {
    res.status(400).json('Error updating entries');
  }
};

export { handleImageGet };
