'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', eventDate: '', decorationType: '',
    budget: '', location: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappMsg = encodeURIComponent(
      `*New Booking Inquiry*%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A` +
      `Event Date: ${form.eventDate}%0A` +
      `Decoration Type: ${form.decorationType}%0A` +
      `Budget: ${form.budget}%0A` +
      `Location: ${form.location}%0A` +
      `Message: ${form.message}`
    )
    window.open(`https://wa.me/919876543210?text=${whatsappMsg}`, '_blank')
    setSubmitted(true)
    setForm({ name: '', phone: '', eventDate: '', decorationType: '', budget: '', location: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="section-padding relative bg-[#0b0b0b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_60%)]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium border-[rgba(212,175,55,0.15)]">
            Get In Touch
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-4">
            Book Your <span className="gold-gradient">Celebration</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[500px] mx-auto font-light">
            Tell us about your event and we&apos;ll create the perfect decoration for you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {submitted && (
            <div className="mb-6 px-6 py-4 rounded-2xl glass border-[rgba(212,175,55,0.2)] text-center">
              <p className="text-[#d4af37] text-sm font-medium">Thank you! Your inquiry has been sent via WhatsApp. We&apos;ll contact you shortly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 sm:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
              <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
              <InputField label="Event Date" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required />
              <InputField label="Decoration Type" name="decorationType" placeholder="e.g. Wedding, Birthday, Proposal" value={form.decorationType} onChange={handleChange} required />
              <InputField label="Budget Range" name="budget" placeholder="e.g. ₹5,000 – ₹10,000" value={form.budget} onChange={handleChange} required />
              <InputField label="Location" name="location" placeholder="e.g. Pune, Hinjewadi" value={form.location} onChange={handleChange} required />
            </div>
            <div className="mt-5">
              <label className="block text-xs text-[rgba(255,255,255,0.4)] mb-2 tracking-wide uppercase">Message (Optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us more about your event..."
                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-sm placeholder-[rgba(255,255,255,0.25)] outline-none transition-all duration-300 focus:border-[rgba(212,175,55,0.3)] focus:bg-[rgba(255,255,255,0.06)] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-8 py-3.5 rounded-full btn-gold text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
              Send Inquiry via WhatsApp
            </button>
          </form>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
            {[
              { label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210', icon: '📞' },
              { label: 'Email Us', value: 'hello@mahekdecorators.com', href: 'mailto:hello@mahekdecorators.com', icon: '✉️' },
              { label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210', icon: '💬' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 text-center no-underline group"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-[rgba(255,255,255,0.4)] mb-1 tracking-wide uppercase">{item.label}</div>
                <div className="text-sm text-white font-medium group-hover:text-[#d4af37] transition-colors">{item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, name, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs text-[rgba(255,255,255,0.4)] mb-2 tracking-wide uppercase">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-sm placeholder-[rgba(255,255,255,0.25)] outline-none transition-all duration-300 focus:border-[rgba(212,175,55,0.3)] focus:bg-[rgba(255,255,255,0.06)]"
      />
    </div>
  )
}
