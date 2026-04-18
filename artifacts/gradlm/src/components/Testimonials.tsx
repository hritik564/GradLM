import { useEffect, useRef } from "react";

const earlyAccessCards = [
  {
    icon: "🎓",
    title: "Priority Counselling",
    body: "Founding batch students get 1-on-1 sessions directly with senior counsellors — not junior associates.",
    delay: "0ms",
  },
  {
    icon: "💼",
    title: "Career Head Start",
    body: "Get early access to our career placement program before we open it to the general public.",
    delay: "100ms",
  },
  {
    icon: "🔒",
    title: "Locked-In Zero Fees",
    body: "Early users will never be charged — even if we introduce premium tiers later.",
    delay: "200ms",
  },
];

export default function Testimonials({ onOpenModal }: { onOpenModal?: () => void }) {
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
    <section ref={ref} className="py-20 md:py-28 bg-[#F4F6FF]" data-testid="early-access-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 scroll-observe">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">Join Our Community</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Be Among Our First <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We're onboarding our founding batch of students. Get priority access, personal attention, and our lowest counsellor ratios — ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {earlyAccessCards.map((card) => (
            <div
              key={card.title}
              className="scroll-observe bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border text-center"
              style={{ transitionDelay: card.delay }}
              data-testid={`early-access-card-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="text-4xl mb-5">{card.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center scroll-observe" style={{ transitionDelay: "300ms" }}>
          <button
            onClick={onOpenModal}
            className="gradient-bg px-10 py-4 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
            data-testid="founding-spot-cta"
          >
            Claim Your Founding Spot →
          </button>
        </div>
      </div>
    </section>
  );
}
