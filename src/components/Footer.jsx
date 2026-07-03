export default function Footer() {
  return (
    <footer id="faq" className="relative bg-[#0b0b0b] border-t border-[rgba(255,255,255,0.05)]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8962e] flex items-center justify-center text-[#0b0b0b] font-bold text-lg font-display shadow-lg">
                M
              </div>
              <div className="leading-tight">
                <div className="text-[17px] font-bold tracking-tight text-white font-display -mb-[2px]">MAHEK</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">Decorator</div>
              </div>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.4)] leading-relaxed max-w-[260px] font-light">
              Premium balloon decoration services across Pune and nearby cities. Transforming every celebration into a memory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium">Quick Links</h4>
            <ul className="space-y-3 list-none">
              {['Home', 'Decorations', 'Gallery', 'Reviews', 'Packages', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-[rgba(255,255,255,0.4)] no-underline transition-colors duration-300 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium">Services</h4>
            <ul className="space-y-3 list-none">
              {['Birthday Decoration', 'Wedding Decoration', 'Corporate Events', 'Proposal Setup', 'Baby Shower', 'Luxury Events'].map((s) => (
                <li key={s}>
                  <a href="#decorations" className="text-sm text-[rgba(255,255,255,0.4)] no-underline transition-colors duration-300 hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium">Contact</h4>
            <ul className="space-y-3 list-none">
              <li className="text-sm text-[rgba(255,255,255,0.4)]">📞 +91 98765 43210</li>
              <li className="text-sm text-[rgba(255,255,255,0.4)]">✉️ hello@mahekdecorators.com</li>
              <li className="text-sm text-[rgba(255,255,255,0.4)]">📍 Pune, Maharashtra</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[rgba(255,255,255,0.25)]">© 2025 MAHEK DECORATOR. All rights reserved.</p>
          <div className="flex gap-4">
            {['IG', 'FB', 'YT', 'WA'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full glass text-xs text-[rgba(255,255,255,0.4)] no-underline flex items-center justify-center transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] border-[rgba(255,255,255,0.08)]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
