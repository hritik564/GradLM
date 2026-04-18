import { Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Press"],
  Services: ["University Selection", "Education Loans", "Visa Assistance", "SOP Writing", "Career & Job Placement"],
  Countries: ["USA", "UK", "Canada", "Australia", "Germany", "Singapore"],
  Resources: ["GRE Guide", "Loan Calculator", "Visa Checklist", "Scholarship Finder"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0C2B] text-white" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-3">
              Grad<span className="gradient-text">LM</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">From university shortlisting to your first job abroad — expert guidance, zero fees.</p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="social-linkedin">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="social-instagram">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="social-youtube">
                <Youtube size={16} />
              </a>
              <a href="https://wa.me/919266599208" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="social-whatsapp">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© 2026 GradLM. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
