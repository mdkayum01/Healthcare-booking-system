const { doctors, getDoctorById: findDoctorById } = require('../data/store');

const getDoctors = async (req, res) => {
  res.json({ doctors });
};

const getDoctorById = async (req, res) => {
  const doctor = findDoctorById(req.params.id);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  res.json({ doctor });
};

const createDoctorProfile = async (req, res) => {
  const { id, name, specialty, experience, fee, bio, available, rating, color } = req.body;

  const doctor = {
    id: id || `doc-${Date.now()}`,
    name: name || 'Dr. New Specialist',
    specialty: specialty || 'General Medicine',
    experience: experience || '5 years',
    fee: fee || '$100',
    bio: bio || 'New specialist profile created for the platform.',
    available: available || 'Next available today',
    rating: rating || 4.8,
    color: color || 'blue',
  };

  doctors.push(doctor);
  res.status(201).json({ doctor });
};

module.exports = { getDoctors, getDoctorById, createDoctorProfile };
