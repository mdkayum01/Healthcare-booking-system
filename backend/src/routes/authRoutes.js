const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { getUsers, getUserById, updateProfile } = require('../controllers/userController');
const { getDoctors, getDoctorById, createDoctorProfile } = require('../controllers/doctorController');
const { createBooking, getBookingsByUser, getBookingsByDoctor } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

router.get('/users', protect, admin, getUsers);
router.get('/users/:id', protect, getUserById);
router.put('/users/profile', protect, updateProfile);

router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);
router.post('/doctors', protect, admin, createDoctorProfile);

router.post('/bookings', protect, createBooking);
router.get('/bookings/me', protect, getBookingsByUser);
router.get('/bookings/doctor/:doctorId', protect, admin, getBookingsByDoctor);

module.exports = router;
