import { useState } from "react";
import { Check } from "lucide-react";

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwSX5_S0IF1uRkLEXyLWbac9vAGX_K5TnTauAG-8kFcVAiyzY_J1_dGEg8MMmh_f7Ug1Q/exec";

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "Others"];
const degrees = ["Bachelor's", "Master's", "PhD"];
const intakes = ["Fall 2025", "Spring 2026", "Fall 2026", "Spring 2027"];
const goalOptions = [
  "Land a job in the country I study in",
  "Return to India with a foreign degree",
  "Start my own business",
  "Pursue further research / PhD",
  "Not sure yet",
];
const helpOptions = [
  "University Selection",
  "Education Loan",
  "Visa Assistance",
  "SOP Writing",
  "Career & Job Placement",
  "Scholarships",
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  country: string;
  degree: string;
  intake: string;
  goal: string;
  helpWith: string[];
  gre: string;
  gpa: string;
}

const initialData: FormData = {
  name: "", phone: "", email: "",
  country: "", degree: "", intake: "", goal: "",
  helpWith: [], gre: "", gpa: "",
};

export default function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!data.name.trim()) e.name = "Required";
      if (!data.phone.trim()) e.phone = "Required";
      if (!data.email.trim() || !data.email.includes("@")) e.email = "Valid email required";
    }
    if (step === 2) {
      if (!data.country) e.country = "Required";
      if (!data.degree) e.degree = "Required";
      if (!data.intake) e.intake = "Required";
      if (!data.goal) e.goal = "Required";
    }
    if (step === 3) {
      if (data.helpWith.length === 0) e.helpWith = "Select at least one" as unknown as undefined;
      if (!data.gpa.trim()) e.gpa = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => Math.min(s + 1, 3));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError(false);

    const payload = {
      fullName: data.name,
      phone: data.phone,
      email: data.email,
      country: data.country,
      degree: data.degree,
      intake: data.intake,
      postGradGoal: data.goal,
      helpNeeded: data.helpWith,
      greScore: data.gre,
      gpa: data.gpa,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleHelp = (opt: string) => {
    setData((d) => ({
      ...d,
      helpWith: d.helpWith.includes(opt)
        ? d.helpWith.filter((h) => h !== opt)
        : [...d.helpWith, opt],
    }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="form-success">
        <div className="relative w-20 h-20 mb-6">
          <svg viewBox="0 0 80 80" className="w-20 h-20">
            <circle
              cx="40" cy="40" r="36"
              fill="none" stroke="#10B981" strokeWidth="4"
              strokeDasharray="226" strokeDashoffset="226"
              className="animate-draw-circle"
              style={{ animationFillMode: "forwards" }}
            />
            <path
              d="M24 40l12 12 20-22"
              fill="none" stroke="#10B981" strokeWidth="4"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-foreground mb-2">You're in! 🎉</h3>
        <p className="text-muted-foreground mb-6">Our counsellor will call you within 2 hours.</p>
        <a
          href="https://wa.me/919266599208"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white px-7 py-3.5 font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#25D366", borderRadius: "999px" }}
          data-testid="whatsapp-button"
        >
          WhatsApp Us Now →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate data-testid="lead-form">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "gradient-bg" : "bg-muted text-muted-foreground"}`}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 3 && <div className={`h-0.5 w-12 mx-1 transition-all ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {step === 1 ? "Basic Info" : step === 2 ? "Your Profile" : "Your Needs"}
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              placeholder="Priya Sharma"
              data-testid="input-name"
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
            <div className="flex gap-2">
              <span className="px-3 py-3 bg-muted rounded-xl border border-input text-sm font-medium">+91</span>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className={`flex-1 px-4 py-3 rounded-xl border ${errors.phone ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
                placeholder="9876543210"
                data-testid="input-phone"
              />
            </div>
            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              placeholder="priya@email.com"
              data-testid="input-email"
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Target Country *</label>
            <select
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.country ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              data-testid="select-country"
            >
              <option value="">Select country...</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Degree Level *</label>
            <select
              value={data.degree}
              onChange={(e) => setData({ ...data, degree: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.degree ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              data-testid="select-degree"
            >
              <option value="">Select degree...</option>
              {degrees.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.degree && <p className="text-destructive text-xs mt-1">{errors.degree}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Target Intake *</label>
            <select
              value={data.intake}
              onChange={(e) => setData({ ...data, intake: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.intake ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              data-testid="select-intake"
            >
              <option value="">Select intake...</option>
              {intakes.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            {errors.intake && <p className="text-destructive text-xs mt-1">{errors.intake}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">What's your goal after graduation? *</label>
            <select
              value={data.goal}
              onChange={(e) => setData({ ...data, goal: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.goal ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              data-testid="select-goal"
            >
              <option value="">Select your goal...</option>
              {goalOptions.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.goal && <p className="text-destructive text-xs mt-1">{errors.goal}</p>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">What do you need help with? *</label>
            <div className="flex flex-wrap gap-2">
              {helpOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleHelp(opt)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    data.helpWith.includes(opt)
                      ? "gradient-bg border-transparent"
                      : "border-input text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  data-testid={`help-option-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {(errors as Record<string, string>).helpWith && (
              <p className="text-destructive text-xs mt-1">{(errors as Record<string, string>).helpWith}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              GRE/GMAT Score <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={data.gre}
              onChange={(e) => setData({ ...data, gre: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background"
              placeholder="e.g., 320"
              data-testid="input-gre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">GPA / Percentage *</label>
            <input
              type="text"
              value={data.gpa}
              onChange={(e) => setData({ ...data, gpa: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.gpa ? "border-destructive" : "border-input"} focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background`}
              placeholder="e.g., 8.5 / 85%"
              data-testid="input-gpa"
            />
            {errors.gpa && <p className="text-destructive text-xs mt-1">{errors.gpa}</p>}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={loading}
              className="px-6 py-3 rounded-full border border-input text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              data-testid="button-back"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="flex-1 gradient-bg py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              data-testid="button-next"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 gradient-bg py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              data-testid="button-submit"
            >
              {loading ? (
                <>
                  <span className="animate-spin-circle w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                  Submitting...
                </>
              ) : (
                "Get My Free Counselling →"
              )}
            </button>
          )}
        </div>

        {submitError && (
          <div className="text-center space-y-3 pt-1" data-testid="submit-error">
            <p className="text-destructive text-sm font-medium">
              Something went wrong. Please WhatsApp us directly.
            </p>
            <a
              href="https://wa.me/919266599208"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white text-sm px-5 py-2.5 font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25D366", borderRadius: "999px" }}
            >
              WhatsApp Us →
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
