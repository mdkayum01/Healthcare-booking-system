const { randomUUID } = require('crypto');
const { bookings, getDoctorById, findUserById } = require('../data/store');

const createBooking = async (req, res) => {
  const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

  const doctor = getDoctorById(doctorId);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  const booking = {
    _id: randomUUID(),
    id: randomUUID(),
    patient: req.user.id,
    doctor: doctorId,
    appointmentDate,
    appointmentTime,
    reason: reason || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    doctorDetails: {
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      user: {
        name: doctor.name,
      },
    },
  };

  bookings.push(booking);

  res.status(201).json({ message: 'Appointment booked successfully', booking });
};

const getBookingsByUser = async (req, res) => {
  const patientBookings = bookings
    .filter((booking) => booking.patient === req.user.id)
    .map((booking) => {
      const doctor = getDoctorById(booking.doctor);
      return {
        ...booking,
        doctor: doctor
          ? {
              ...doctor,
              user: { name: doctor.name },
            }
          : { user: { name: 'Doctor' } },
      };
    });

  res.json({ bookings: patientBookings });
};

const getBookingsByDoctor = async (req, res) => {
  const doctorBookings = bookings
    .filter((booking) => booking.doctor === req.params.doctorId)
    .map((booking) => ({
      ...booking,
      patient: findUserById(booking.patient)
        ? {
            id: findUserById(booking.patient).id,
            name: findUserById(booking.patient).name,
            email: findUserById(booking.patient).email,
          }
        : null,
    }));

  res.json({ bookings: doctorBookings });
};

module.exports = { createBooking, getBookingsByUser, getBookingsByDoctor };
