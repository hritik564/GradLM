import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is your service really free?",
    a: "Yes, completely free. GradLM is compensated by our partner universities and lenders — never by students. You get expert guidance at zero cost.",
  },
  {
    q: "How is GradLM different from other consultants?",
    a: "We use data, not intuition. Your shortlist is based on real admit probability, ROI, and your profile — not which universities pay us the most commission. We believe in radical transparency.",
  },
  {
    q: "How quickly can I get a university shortlist?",
    a: "Within 24 hours of your first call with our counsellor. We move fast because we know your deadlines matter.",
  },
  {
    q: "Which countries do you help with?",
    a: "USA, UK, Canada, Australia, Germany, Ireland, Singapore, and more. Our counsellors are specialists in each region and stay up-to-date with the latest requirements.",
  },
  {
    q: "Can you help with education loans?",
    a: "Absolutely. We compare rates across 10+ lenders including public banks, private NBFCs, and international lenders. Our team negotiates on your behalf to get you the best possible deal.",
  },
];

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-border rounded-2xl overflow-hidden transition-all duration-200"
      data-testid={`faq-item-${idx}`}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/40 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`faq-toggle-${idx}`}
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
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
    <section id="faq" ref={ref} className="py-20 md:py-28 bg-white" data-testid="faq-section">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12 scroll-observe">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Questions We Get <span className="gradient-text">All The Time</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="scroll-observe" style={{ transitionDelay: `${idx * 60}ms` }}>
              <FAQItem q={faq.q} a={faq.a} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
