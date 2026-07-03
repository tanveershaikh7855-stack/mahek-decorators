const express = require('express')
const router = express.Router()

let contacts = []

// GET all contacts
router.get('/', (req, res) => {
  res.json(contacts)
})

// POST new contact
router.post('/', (req, res) => {
  const { name, phone, email, message } = req.body

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const contact = {
    id: Date.now(),
    name,
    phone,
    email: email || '',
    message,
    read: false,
    createdAt: new Date().toISOString(),
  }

  contacts.push(contact)

  console.log(`New contact from ${name} (${phone})`)

  res.status(201).json({ success: true, contact })
})

module.exports = router
