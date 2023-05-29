const handleUsersGet = (db) => async (req, res) => {
  try {
    const users = await db.select('*').from('users');
    return res.json(users);
  } catch (err) {
    res.status(400).json('Error getting users');
  }
};

export { handleUsersGet };
