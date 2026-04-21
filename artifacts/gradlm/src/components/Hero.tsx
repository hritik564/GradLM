import { useEffect, useRef } from "react";

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
              Counsellors with 10+ Years of Experience
            </div>
            <h1 className="text-[40px] md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              The <span className="gradient-text">Smarter Way</span><br />
              To Study Abroad
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-[540px] leading-relaxed">
              From university shortlisting to landing your first job abroad — expert guidance, zero fees, zero confusion.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
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

            {/* 3 pill trust badges */}
            <div className="flex flex-wrap gap-2" data-testid="hero-pill-badges">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-foreground shadow-sm">
                🎓 University Shortlisting
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full gradient-bg text-sm font-bold shadow-md shadow-primary/20">
                💼 Career & Job Placement
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-foreground shadow-sm">
                💰 Education Loans
              </span>
            </div>

            <p className="mt-6 text-sm text-gray-500 font-medium" data-testid="hero-trust-line">
              ✅ Free. Expert-led. Career-focused.
            </p>
          </div>

          <div className="hidden lg:block lg:w-1/2 relative scroll-observe" style={{ transitionDelay: "200ms" }} data-testid="hero-illustration">
            <div className="relative w-full max-w-lg mx-auto">
              <svg viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
                <ellipse cx="260" cy="240" rx="220" ry="200" fill="url(#bgGrad)" fillOpacity="0.12" />
                <circle cx="270" cy="220" r="150" fill="url(#globeGrad)" />
                <circle cx="270" cy="220" r="150" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                <ellipse cx="270" cy="220" rx="60" ry="150" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                <ellipse cx="270" cy="220" rx="120" ry="150" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="120" y1="220" x2="420" y2="220" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                <line x1="135" y1="170" x2="405" y2="170" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="135" y1="270" x2="405" y2="270" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                <circle cx="270" cy="165" r="28" fill="white" />
                <path d="M220 260C220 233.5 243.5 212 270 212C296.5 212 320 233.5 320 260V290H220V260Z" fill="white" />
                <polygon points="270,125 235,142 270,159 305,142" fill="white" />
                <rect x="305" y="142" width="3" height="22" rx="1.5" fill="white" />
                <circle cx="305" cy="167" r="4" fill="white" />
                <rect x="350" y="280" width="80" height="55" rx="8" fill="white" fillOpacity="0.9" />
                <line x1="362" y1="300" x2="418" y2="300" stroke="url(#globeGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="362" y1="312" x2="400" y2="312" stroke="url(#globeGrad)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
                <line x1="362" y1="321" x2="408" y2="321" stroke="url(#globeGrad)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
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

              {/* Floating Badge — updated */}
              <div className="absolute top-8 -left-4 md:-left-10 bg-white rounded-2xl px-4 py-3 shadow-2xl border border-border animate-float flex items-center gap-3 z-10">
                <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-xl flex-shrink-0">
                  🎓
                </div>
                <div>
                  <div className="text-sm font-extrabold text-foreground leading-snug">10+ Years</div>
                  <div className="text-xs text-muted-foreground font-medium">of Counsellor<br />Experience</div>
                </div>
              </div>

              {/* Secondary badge */}
              <div className="absolute bottom-12 -right-4 md:-right-6 bg-white rounded-2xl px-4 py-3 shadow-xl border border-border flex items-center gap-3 z-10">
                <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-lg flex-shrink-0">
                  💼
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Career Support</div>
                  <div className="text-xs text-muted-foreground">After Graduation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
