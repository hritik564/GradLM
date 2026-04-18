const row1 = ["MIT", "Stanford", "Harvard", "Cornell", "Columbia", "UCLA", "ASU", "Purdue", "UMich", "Georgia Tech"];
const row2 = ["Oxford", "Cambridge", "UCL", "Edinburgh", "TU Munich", "NUS", "Melbourne", "UBC", "Toronto", "McGill"];

function Pill({ name }: { name: string }) {
  return (
    <span className="gradient-border rounded-full px-5 py-2 text-sm font-semibold text-foreground bg-white mx-2 flex-shrink-0 whitespace-nowrap">
      {name}
    </span>
  );
}

export default function UniversityMarquee() {
  const doubledRow1 = [...row1, ...row1, ...row1];
  const doubledRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="universities" className="py-20 md:py-24 bg-white overflow-hidden" data-testid="university-marquee-section">
      <div className="container mx-auto px-4 md:px-6 mb-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">Our Alumni Network</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Our Students Study <span className="gradient-text">At</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee">
            {doubledRow1.map((u, i) => <Pill key={i} name={u} />)}
          </div>
          <div className="flex animate-marquee" aria-hidden>
            {doubledRow1.map((u, i) => <Pill key={i + 100} name={u} />)}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {doubledRow2.map((u, i) => <Pill key={i} name={u} />)}
          </div>
          <div className="flex animate-marquee-reverse" aria-hidden>
            {doubledRow2.map((u, i) => <Pill key={i + 100} name={u} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
