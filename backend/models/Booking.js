const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  eventDate: { type: Date, required: true },
  decorationType: { type: String, required: true },
  budget: { type: String },
  location: { type: String, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  paymentId: { type: String },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Booking', BookingSchema)
