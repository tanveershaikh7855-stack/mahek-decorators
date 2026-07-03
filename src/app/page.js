import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Decorations from '@/components/Decorations'
import Negotiation from '@/components/Negotiation'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import GoogleMaps from '@/components/GoogleMaps'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CallButton from '@/components/CallButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b]">
      <Navbar />
      <Hero />
      <Decorations />
      <Negotiation />
      <Gallery />
      <Reviews />
      <Contact />
      <GoogleMaps />
      <Footer />
      <WhatsAppButton />
      <CallButton />
    </main>
  )
}
