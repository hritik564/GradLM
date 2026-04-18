import { useState } from "react";

const row1 = [
  { name: "MIT", domain: "mit.edu" },
  { name: "Stanford", domain: "stanford.edu" },
  { name: "Harvard", domain: "harvard.edu" },
  { name: "Cornell", domain: "cornell.edu" },
  { name: "Columbia", domain: "columbia.edu" },
  { name: "UCLA", domain: "ucla.edu" },
  { name: "Georgia Tech", domain: "gatech.edu" },
  { name: "Purdue", domain: "purdue.edu" },
  { name: "UT Austin", domain: "utexas.edu" },
  { name: "UMich", domain: "umich.edu" },
];

const row2 = [
  { name: "Oxford", domain: "ox.ac.uk" },
  { name: "Cambridge", domain: "cam.ac.uk" },
  { name: "UCL", domain: "ucl.ac.uk" },
  { name: "Edinburgh", domain: "ed.ac.uk" },
  { name: "TU Munich", domain: "tum.de" },
  { name: "NUS", domain: "nus.edu.sg" },
  { name: "Melbourne", domain: "unimelb.edu.au" },
  { name: "UBC", domain: "ubc.ca" },
  { name: "Toronto", domain: "utoronto.ca" },
  { name: "McGill", domain: "mcgill.ca" },
];

function LogoCard({ name, domain }: { name: string; domain: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex-shrink-0 mx-3 w-36 h-24 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-border flex flex-col items-center justify-center gap-2 px-3">
      {!imgFailed ? (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="h-12 w-auto object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="text-sm font-semibold gradient-text text-center leading-tight">{name}</span>
      )}
      <span className="text-xs font-medium text-gray-600 text-center leading-tight">{name}</span>
    </div>
  );
}

export default function UniversityMarquee() {
  const doubledRow1 = [...row1, ...row1, ...row1];
  const doubledRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="universities" className="py-20 md:py-24 bg-white overflow-hidden" data-testid="university-marquee-section">
      <div className="container mx-auto px-4 md:px-6 mb-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary mb-4">Target Universities</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          We Help You Get <span className="gradient-text">Into</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee">
            {doubledRow1.map((u, i) => <LogoCard key={i} name={u.name} domain={u.domain} />)}
          </div>
          <div className="flex animate-marquee" aria-hidden>
            {doubledRow1.map((u, i) => <LogoCard key={i + 100} name={u.name} domain={u.domain} />)}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {doubledRow2.map((u, i) => <LogoCard key={i} name={u.name} domain={u.domain} />)}
          </div>
          <div className="flex animate-marquee-reverse" aria-hidden>
            {doubledRow2.map((u, i) => <LogoCard key={i + 100} name={u.name} domain={u.domain} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
