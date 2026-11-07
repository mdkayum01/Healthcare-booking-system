const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialty: { type: String, required: true },
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    fee: { type: Number, default: 25 },
    bio: { type: String, default: '' },
    availableSlots: [{ type: String }],
    clinicAddress: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
