import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-observe").forEach((el) => el.classList.add("in-view"));
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const avatarColors = ["#2D31FA", "#7B2FBE", "#0EA5E9", "#10B981"];
  const avatarInitials = ["P", "R", "S", "A"];

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative" ref={ref} data-testid="hero-section">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-b from-[#F4F6FF] to-transparent opacity-60 pointer-events-none rounded-bl-[80px]" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          <div className="w-full lg:w-1/2 flex flex-col items-start scroll-observe" data-testid="hero-content">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 12,000+ students
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              The <span className="gradient-text">Smarter Way</span><br />
              To Study Abroad
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-[540px] leading-relaxed">
              Expert guidance on universities, loans, and visas — all in one place. Zero fees, zero confusion.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenModal}
                className="w-full sm:w-auto gradient-bg px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
                data-testid="hero-cta-primary"
              >
                Get Free Counselling
              </button>
              <button
                onClick={() => document.getElementById("universities")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-white text-foreground border border-input shadow-sm hover:bg-muted/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                data-testid="hero-cta-secondary"
              >
                Explore Universities
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: color }}>
                    {avatarInitials[i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium text-foreground">4.8/5 from 2,400+ students</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative scroll-observe" style={{ transitionDelay: "200ms" }} data-testid="hero-illustration">
            <div className="relative w-full max-w-lg mx-auto">
              <svg viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
                {/* Background blob */}
                <ellipse cx="260" cy="240" rx="220" ry="200" fill="url(#bgGrad)" fillOpacity="0.12" />
                {/* Globe */}
                <circle cx="270" cy="220" r="150" fill="url(#globeGrad)" />
                <circle cx="270" cy="220" r="150" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                {/* Globe lines */}
                <ellipse cx="270" cy="220" rx="60" ry="150" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                <ellipse cx="270" cy="220" rx="120" ry="150" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="120" y1="220" x2="420" y2="220" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                <line x1="135" y1="170" x2="405" y2="170" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="135" y1="270" x2="405" y2="270" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                {/* Student body */}
                <circle cx="270" cy="165" r="28" fill="white" />
                <path d="M220 260C220 233.5 243.5 212 270 212C296.5 212 320 233.5 320 260V290H220V260Z" fill="white" />
                {/* Graduation cap */}
                <polygon points="270,125 235,142 270,159 305,142" fill="white" />
                <rect x="305" y="142" width="3" height="22" rx="1.5" fill="white" />
                <circle cx="305" cy="167" r="4" fill="white" />
                {/* Diploma scroll accent */}
                <rect x="350" y="280" width="80" height="55" rx="8" fill="white" fillOpacity="0.9" />
                <line x1="362" y1="300" x2="418" y2="300" stroke="url(#globeGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="362" y1="312" x2="400" y2="312" stroke="url(#globeGrad)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
                <line x1="362" y1="321" x2="408" y2="321" stroke="url(#globeGrad)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
                {/* Stars */}
                <text x="86" y="140" fontSize="18" fill="white" fillOpacity="0.6">★</text>
                <text x="430" y="310" fontSize="12" fill="white" fillOpacity="0.5">★</text>
                <text x="110" y="330" fontSize="10" fill="white" fillOpacity="0.4">★</text>
                <defs>
                  <linearGradient id="bgGrad" x1="0" y1="0" x2="520" y2="480" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2D31FA" />
                    <stop offset="1" stopColor="#7B2FBE" />
                  </linearGradient>
                  <linearGradient id="globeGrad" x1="120" y1="70" x2="420" y2="370" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2D31FA" />
                    <stop offset="1" stopColor="#7B2FBE" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Badge */}
              <div className="absolute top-8 -left-4 md:-left-10 bg-white rounded-2xl px-4 py-3 shadow-2xl border border-border animate-float flex items-center gap-3 z-10">
                <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-xl flex-shrink-0">
                  🎓
                </div>
                <div>
                  <div className="text-xl font-extrabold text-foreground leading-none">500+</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Students Placed<br />This Year</div>
                </div>
              </div>

              {/* Secondary badge */}
              <div className="absolute bottom-12 -right-4 md:-right-6 bg-white rounded-2xl px-4 py-3 shadow-xl border border-border flex items-center gap-3 z-10">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
                  ✅
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">95% Visa</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
