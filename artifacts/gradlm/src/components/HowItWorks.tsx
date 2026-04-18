import { useEffect, useRef } from "react";
import { UserCheck, ListChecks, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Fill Your Profile",
    description: "2 mins. Tell us your GRE score, GPA, and dream destinations.",
    delay: "0ms",
  },
  {
    number: "02",
    icon: ListChecks,
    title: "Get Your Shortlist",
    description: "Same day. Expert-matched universities based on your profile and career goals.",
    delay: "150ms",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "We Handle Everything — Including Your Career",
    description: "Loans, SOPs, visa, and after you land — job search support, resume reviews, and referral introductions.",
    delay: "300ms",
  },
];

export default function HowItWorks() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="py-20 bg-white" data-testid="how-it-works-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14 scroll-observe">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">The Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Your Journey in <span className="gradient-text">3 Simple Steps</span>
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-4">
          {/* Connecting dotted line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-primary/30 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="scroll-observe relative flex flex-col items-center text-center flex-1 px-4"
                style={{ transitionDelay: step.delay }}
                data-testid={`step-${idx + 1}`}
              >
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-extrabold text-lg mb-6 shadow-lg shadow-primary/25 z-10 relative">
                  <Icon size={28} />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary/60 mb-2 uppercase">{step.number}</span>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
