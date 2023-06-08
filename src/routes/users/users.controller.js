import {
  getUserById,
  updateUser,
  deleteUser,
} from '../../models/users.model.js';

const httpGetUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

const httpUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await updateUser(id, name, email);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const httpDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export { httpGetUsersById, httpUpdateUser, httpDeleteUser };
