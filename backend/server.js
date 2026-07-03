const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MAHEK DECORATOR API is running' })
})

// Booking routes
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/contacts', require('./routes/contacts'))

app.listen(PORT, () => {
  console.log(`MAHEK DECORATOR API running on port ${PORT}`)
})
