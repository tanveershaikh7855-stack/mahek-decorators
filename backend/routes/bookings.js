const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// In-memory store (replace with MongoDB when connected)
let bookings = []

// GET all bookings
router.get('/', (req, res) => {
  res.json(bookings)
})

// POST create booking
router.post('/', (req, res) => {
  const { name, phone, email, eventDate, decorationType, budget, location, message } = req.body

  if (!name || !phone || !eventDate || !decorationType || !location) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const booking = {
    id: Date.now(),
    name,
    phone,
    email: email || '',
    eventDate,
    decorationType,
    budget: budget || '',
    location,
    message: message || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  bookings.push(booking)

  // WhatsApp notification (simplified)
  const whatsappMsg = encodeURIComponent(
    `*New Booking Received*%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Event: ${eventDate}%0A` +
    `Type: ${decorationType}%0A` +
    `Budget: ${budget}%0A` +
    `Location: ${location}`
  )

  // WhatsApp notification sent

  res.status(201).json({ success: true, booking })
})

// UPDATE booking status
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const booking = bookings.find((b) => b.id === parseInt(id))
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' })
  }

  booking.status = status
  res.json({ success: true, booking })
})

module.exports = router
