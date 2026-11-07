const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createBooking, getBookingsByUser, getBookingsByDoctor } = require('../controllers/bookingController');
const { admin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/me', protect, getBookingsByUser);
router.get('/doctor/:doctorId', protect, admin, getBookingsByDoctor);

module.exports = router;
