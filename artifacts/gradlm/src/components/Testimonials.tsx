import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya S.", uni: "Cornell University", country: "🇺🇸", quote: "Got my admit in 6 weeks. The team knew exactly which universities to apply to.", initials: "PS", color: "#4F46E5" },
  { name: "Rahul M.", uni: "University of Melbourne", country: "🇦🇺", quote: "Loan was approved in 3 days. Saved ₹2 lakhs on interest.", initials: "RM", color: "#7B2FBE" },
  { name: "Sneha K.", uni: "TU Munich", country: "🇩🇪", quote: "Free of charge and better than any paid consultant I tried.", initials: "SK", color: "#2D31FA" },
  { name: "Arjun T.", uni: "UBC Canada", country: "🇨🇦", quote: "Visa approved first attempt. The SOP they helped me write was flawless.", initials: "AT", color: "#0EA5E9" },
  { name: "Divya R.", uni: "University of Edinburgh", country: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", quote: "From shortlist to offer letter in 8 weeks. Unbelievable.", initials: "DR", color: "#8B5CF6" },
  { name: "Karan B.", uni: "ASU", country: "🇺🇸", quote: "Used 3 consultants before. GradLM was the only one that was honest.", initials: "KB", color: "#06B6D4" },
  { name: "Meera J.", uni: "Monash University", country: "🇦🇺", quote: "The loan comparison alone saved me ₹1.5L over the loan tenure.", initials: "MJ", color: "#F59E0B" },
  { name: "Nikhil P.", uni: "NUS Singapore", country: "🇸🇬", quote: "Zero fee platform that outperforms every paid consultancy.", initials: "NP", color: "#10B981" },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="min-w-[300px] max-w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-border mx-3 flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.uni} {t.country}</div>
        </div>
      </div>
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-28 bg-[#F4F6FF] overflow-hidden" data-testid="testimonials-section">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">Student Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Loved by students <span className="gradient-text">across India</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee">
            {doubled.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden>
            {doubled.map((t, i) => (
              <TestimonialCard key={i + 100} t={t} />
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F4F6FF] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F4F6FF] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
