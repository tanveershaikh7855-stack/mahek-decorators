'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CONFIG, { whatsappUrl } from '@/lib/config'

const OCCASIONS = [
  'Birthday Party', 'Wedding', 'Anniversary', 'Baby Shower',
  'Bridal Shower', 'Corporate Event', 'Festival Decoration',
  'Proposal Decoration', 'Graduation Party', 'Housewarming',
  'Kitty Party', 'Other',
]

const SERVICES = [
  'Balloon Arch', 'Balloon Column', 'Balloon Wall/Backdrop',
  'Balloon Ceiling Decoration', 'Balloon Garland',
  'Theme Decoration', 'Full Event Decoration',
  'Flower Balloon Combo', 'Custom Decoration',
]

const BUDGET_RANGES = [
  'Under ₹5,000', '₹5,000 - ₹15,000', '₹15,000 - ₹30,000',
  '₹30,000 - ₹50,000', 'Above ₹50,000', 'Not Sure',
]

const PREFERRED_CONTACT = ['WhatsApp', 'Phone Call', 'Email']

const initialForm = {
  name: '', phone: '', email: '', occasion: '', service: '',
  budget: '', eventDate: '', eventTime: '', guestCount: '',
  location: '', preferredContact: '', message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) newErrors.phone = 'Enter a valid phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.occasion) newErrors.occasion = 'Select your occasion'
    if (!form.service) newErrors.service = 'Select a service'
    if (!form.eventDate) newErrors.eventDate = 'Select your event date'
    if (!form.location.trim()) newErrors.location = 'Event location is required'
    if (form.guestCount && (isNaN(form.guestCount) || Number(form.guestCount) < 1)) newErrors.guestCount = 'Enter a valid number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setErrors({ form: 'Something went wrong. Please try again or contact us directly on WhatsApp.' })
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (name) =>
    `w-full bg-[rgba(255,255,255,0.03)] border ${
      errors[name]
        ? 'border-[rgba(239,68,68,0.4)]'
        : focusedField === name
        ? 'border-[rgba(212,175,55,0.4)]'
        : 'border-[rgba(255,255,255,0.08)]'
    } rounded-xl px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.25)] outline-none transition-all duration-300 focus:border-[rgba(212,175,55,0.5)] focus:bg-[rgba(212,175,55,0.03)] focus:shadow-[0_0_20px_rgba(212,175,55,0.05)]`

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-[rgba(212,175,55,0.15)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-white mb-3">Thank You!</h3>
        <p className="text-[rgba(255,255,255,0.55)] text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          We&apos;ve received your inquiry. Our team will reach out within 30 minutes on your preferred contact method.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={whatsappUrl(CONFIG.whatsappMessages.general)} target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full btn-gold text-xs no-underline">
            Chat on WhatsApp
          </a>
          <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 rounded-full btn-outline text-xs cursor-pointer">
            Send Another
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {errors.form && (
        <div className="p-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-xs text-[rgba(255,255,255,0.7)] mb-2">
          {errors.form}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField name="name" label="Full Name *" placeholder="Bilal Shaikh" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />
        <InputField name="phone" label="Phone Number *" placeholder="8087867988" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField name="email" label="Email Address" placeholder="hello@example.com" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />
        <SelectField name="occasion" label="Occasion *" options={OCCASIONS} placeholder="Select occasion" form={form} handleChange={handleChange} errors={errors} fieldClass={fieldClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField name="service" label="Service *" options={SERVICES} placeholder="Select service" form={form} handleChange={handleChange} errors={errors} fieldClass={fieldClass} />
        <SelectField name="budget" label="Budget Range" options={BUDGET_RANGES} placeholder="Select budget" form={form} handleChange={handleChange} errors={errors} fieldClass={fieldClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField name="eventDate" label="Event Date *" type="date" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />
        <InputField name="eventTime" label="Event Time" type="time" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />
        <InputField name="guestCount" label="Guest Count" placeholder="e.g. 100" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />
      </div>

      <InputField name="location" label="Event Location *" placeholder="Pune, Maharashtra" form={form} handleChange={handleChange} errors={errors} focusedField={focusedField} setFocusedField={setFocusedField} fieldClass={fieldClass} />

      <div>
        <label className="block text-xs font-medium tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)] mb-2">Preferred Contact Method</label>
        <div className="flex flex-wrap gap-2">
          {PREFERRED_CONTACT.map((method) => (
            <button
              key={method}
              type="button"
              name="preferredContact"
              onClick={() => handleChange({ target: { name: 'preferredContact', value: method } })}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 border cursor-pointer ${
                form.preferredContact === method
                  ? 'bg-[rgba(212,175,55,0.15)] border-[rgba(212,175,55,0.3)] text-[#d4af37]'
                  : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)] hover:text-white hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)] mb-2">Additional Details</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          placeholder="Tell us more about your event, theme preferences, colors, special requests..."
          rows={3}
          className={`${fieldClass('message')} resize-none`}
        />
      </div>

      {(errors.name || errors.phone || errors.occasion || errors.service || errors.eventDate || errors.location) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(errors).filter(([k, v]) => k !== 'form' && v).map(([key, val]) => (
            <span key={key} className="text-[11px] text-[rgba(239,68,68,0.7)]">{val}</span>
          ))}
        </div>
      )}

      {form.preferredContact !== 'WhatsApp' ? (
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl btn-gold text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Sending...
            </span>
          ) : (
            'Send Inquiry'
          )}
        </button>
      ) : (
        <a
          href={whatsappUrl(CONFIG.whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 rounded-xl btn-gold text-sm font-medium text-center block no-underline"
        >
          Contact via WhatsApp
        </a>
      )}

      <p className="text-[11px] text-[rgba(255,255,255,0.2)] text-center mt-4">
        We respect your privacy. Your details are secure and will only be used to serve you better.
      </p>
    </form>
  )
}

function InputField({ name, label, placeholder, type = 'text', form, handleChange, errors, focusedField, setFocusedField, fieldClass }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)] mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        placeholder={placeholder}
        className={fieldClass(name)}
      />
    </div>
  )
}

function SelectField({ name, label, options, placeholder, form, handleChange, errors, fieldClass }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)] mb-2">{label}</label>
      <select
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`${fieldClass(name)} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22rgba(255,255,255,0.3)%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M3%205l3%203%203-3%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
        style={form[name] ? { color: 'white' } : { color: 'rgba(255,255,255,0.25)' }}
      >
        <option value="" disabled className="bg-[#1a1a1a]">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#1a1a1a] text-white">{opt}</option>
        ))}
      </select>
    </div>
  )
}
