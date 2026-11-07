const express = require('express');
const { getDoctors, getDoctorById, createDoctorProfile } = require('../controllers/doctorController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', protect, admin, createDoctorProfile);

module.exports = router;
