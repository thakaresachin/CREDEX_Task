import { ShieldCheck, TrendingDown, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: TrendingDown,
    title: "Reduce AI Overspend",
    desc: "Identify unnecessary subscriptions, oversized plans, and overlapping AI tooling across your startup stack.",
  },
  {
    icon: Zap,
    title: "Instant Audit Results",
    desc: "Get real-time savings recommendations powered by hardcoded pricing logic and AI-generated insights.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent & Trustworthy",
    desc: "All recommendations are based on official pricing data sourced directly from vendors.",
  },
];

const About = () => {
  const navigate = useNavigate();

  const handleAuditScroll = () => {
  navigate("/", { state: { scrollToAudit: true } });
};

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            About SpendLens
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900">
            Built for teams spending too much on AI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            SpendLens helps startups understand where their AI budget is
            leaking. We analyze your current AI stack, benchmark it against real
            pricing data, and surface actionable savings opportunities
            instantly.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleAuditScroll}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-gray-700"
          >
            Start Free Audit
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                  <Icon size={20} className="text-gray-700" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;