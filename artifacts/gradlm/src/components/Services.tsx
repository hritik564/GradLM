import { useEffect, useRef } from "react";
import { GraduationCap, BadgeDollarSign, Globe } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "University Selection",
    description: "AI-matched shortlist in minutes based on your GRE, GPA, and budget. No guesswork.",
    cta: "Find Your University →",
    id: "uni",
    delay: "0ms",
  },
  {
    icon: BadgeDollarSign,
    title: "Education Loans",
    description: "Compare 10+ lenders. Lowest interest rates. We negotiate for you.",
    cta: "Check Loan Options →",
    id: "loan",
    delay: "100ms",
  },
  {
    icon: Globe,
    title: "Visa Assistance",
    description: "End-to-end SOP, documentation, and interview prep. 95% success rate.",
    cta: "Start Visa Process →",
    id: "visa",
    delay: "200ms",
  },
];

export default function Services() {
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
    <section id="services" ref={ref} className="py-20 md:py-28 bg-[#F4F6FF]" data-testid="services-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14 scroll-observe">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">What We Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Everything You Need. <span className="gradient-text">One Roof.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            From picking the right university to getting your visa stamped — we're with you every step.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="scroll-observe bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border group cursor-pointer"
                style={{ transitionDelay: service.delay }}
                data-testid={`service-card-${service.id}`}
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <span className="text-sm font-semibold gradient-text group-hover:underline">{service.cta}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
