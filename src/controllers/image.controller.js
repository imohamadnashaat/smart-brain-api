const handleImageGet = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .returning('*')
    .where('id', '=', id)
    .increment('entries', 1)
    .then((user) => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch((err) => res.status(400).json('Error updating entries'));
};

export { handleImageGet };
