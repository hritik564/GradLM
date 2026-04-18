import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import LeadForm from "./LeadForm";

const bullets = [
  "Personalized university shortlist",
  "Loan eligibility check",
  "Visa & SOP guidance",
];

export default function LeadFormSection() {
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
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-[#F4F6FF]" data-testid="lead-form-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Left gradient panel */}
          <div className="lg:w-2/5 p-10 md:p-14 gradient-bg flex flex-col justify-center scroll-observe">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Talk to an Expert.<br />
              <span className="text-white/80">It's Free.</span>
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              No strings attached. Our counsellors are here to guide you — not sell you.
            </p>
            <ul className="space-y-4 mb-10">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white">
                  <CheckCircle size={20} className="flex-shrink-0 text-white/80" />
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-xl">👥</span>
              <span>Join <strong className="text-white">12,000+</strong> students who've already started</span>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:w-3/5 bg-white p-10 md:p-14 scroll-observe" style={{ transitionDelay: "150ms" }}>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
