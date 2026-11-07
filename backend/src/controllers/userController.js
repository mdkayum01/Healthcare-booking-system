const { users, findUserById, updateUserProfile, sanitizeUser } = require('../data/store');

const getUsers = async (req, res) => {
  res.json({ users: users.map((user) => sanitizeUser(user)) });
};

const getUserById = async (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user: sanitizeUser(user) });
};

const updateProfile = async (req, res) => {
  const user = updateUserProfile(req.user.id, req.body);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user: sanitizeUser(user) });
};

module.exports = { getUsers, getUserById, updateProfile };
