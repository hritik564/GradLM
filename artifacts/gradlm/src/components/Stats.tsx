import { useEffect, useRef, useState } from "react";

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 12000, suffix: "+", label: "Students Counselled" },
  { value: 95, suffix: "%", label: "Visa Success Rate" },
  { value: 50, suffix: "+", label: "Partner Universities" },
  { prefix: "₹", value: 0, suffix: "", label: "Fee For You" },
];

function AnimatedCounter({ prefix = "", value, suffix, label, active }: StatItem & { active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, value]);

  const display = value === 0 ? "0" : count >= 1000 ? (count / 1000).toFixed(0) + "K" : count.toString();

  return (
    <div className="text-center px-6 py-4 scroll-observe" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
        {prefix}{value === 0 ? "₹0" : (value >= 1000 ? Math.floor(count / 1000) + "K" : count)}{suffix}
      </div>
      <div className="text-sm font-medium text-white/80 mt-1">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            entry.target.querySelectorAll(".scroll-observe").forEach((el) => el.classList.add("in-view"));
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 relative overflow-hidden" data-testid="stats-section">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D31FA] to-[#7B2FBE]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 translate-x-1/4 translate-y-1/4" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
