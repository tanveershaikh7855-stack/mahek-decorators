import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedDecorations from '@/components/FeaturedDecorations'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b]">
      <Navbar />
      <Hero />
      <FeaturedDecorations />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
