const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');

const doctors = [
  {
    id: 'doc-aisha',
    name: 'Dr. Aisha Rahman',
    specialty: 'Cardiology',
    experience: '12 years',
    rating: 4.9,
    available: 'Today, 9:30 AM',
    color: 'mint',
    fee: '$120',
    bio: 'Cardiology specialist focused on preventive care, heart rhythm monitoring, and long-term cardiovascular health.',
  },
  {
    id: 'doc-michael',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    experience: '10 years',
    rating: 4.8,
    available: 'Today, 1:00 PM',
    color: 'blue',
    fee: '$110',
    bio: 'Neurologist helping patients with migraine care, neurological assessments, and personalized treatment planning.',
  },
  {
    id: 'doc-sofia',
    name: 'Dr. Sofia Patel',
    specialty: 'Dermatology',
    experience: '8 years',
    rating: 4.7,
    available: 'Today, 4:15 PM',
    color: 'peach',
    fee: '$95',
    bio: 'Dermatology specialist for skin health, treatment plans, and routine preventative skin consultations.',
  },
  {
    id: 'doc-omar',
    name: 'Dr. Omar Hassan',
    specialty: 'Orthopedics',
    experience: '15 years',
    rating: 5.0,
    available: 'Tomorrow, 10:45 AM',
    color: 'lavender',
    fee: '$140',
    bio: 'Orthopedic consultant specializing in joint care, sports injuries, and motion restoration therapies.',
  },
];

const users = [
  {
    id: 'admin-seed',
    name: 'System Admin',
    email: 'admin@careconnect.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    phone: '+8801700000000',
    role: 'admin',
  },
];
const bookings = [];

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role || 'patient',
  phone: user.phone || '',
});

const findUserByEmail = (email) => {
  if (!email) return null;
  const normalizedEmail = email.toLowerCase();
  return users.find((user) => user.email.toLowerCase() === normalizedEmail) || null;
};

const findUserById = (id) => users.find((user) => user.id === id) || null;

const getDoctorById = (doctorId) => doctors.find((doctor) => doctor.id === doctorId) || null;

const createUserRecord = async ({ name, email, password, phone, role }) => {
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return null;
  }

  const user = {
    id: randomUUID(),
    name,
    email: email.toLowerCase(),
    passwordHash: await bcrypt.hash(password, 10),
    phone: phone || '',
    role: role || 'patient',
  };

  users.push(user);
  return user;
};

const updateUserProfile = (userId, fields) => {
  const user = findUserById(userId);
  if (!user) return null;

  if (fields.name) user.name = fields.name;
  if (fields.phone) user.phone = fields.phone;
  if (fields.email) user.email = fields.email.toLowerCase();

  return user;
};

const appendBooking = (booking) => {
  bookings.push(booking);
  return booking;
};

module.exports = {
  doctors,
  users,
  bookings,
  sanitizeUser,
  findUserByEmail,
  findUserById,
  getDoctorById,
  createUserRecord,
  updateUserProfile,
  appendBooking,
};
