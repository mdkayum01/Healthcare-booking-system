const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getUsers, getUserById, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.put('/profile', protect, updateProfile);

module.exports = router;
