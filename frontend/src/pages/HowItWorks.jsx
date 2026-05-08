import React from "react";
import { Layers, Sparkles, TrendingDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Layers,
    title: "Add Your AI Stack",
    desc: "Enter the AI tools your team currently pays for including plans, spend, and seats.",
  },
  {
    icon: Sparkles,
    title: "Run Instant Audit",
    desc: "Our engine compares your setup against pricing benchmarks and optimization rules.",
  },
  {
    icon: TrendingDown,
    title: "Discover Savings",
    desc: "See exactly where you can downgrade, consolidate, or optimize your AI spending.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleAuditScroll = () => {
    navigate("/", { state: { scrollToAudit: true } });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            How It Works
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900">
            AI cost optimization in three steps
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            SpendLens combines pricing intelligence, usage-fit analysis, and
            AI-generated insights to help startups reduce unnecessary AI spend.
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

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-3xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="absolute right-6 top-6 text-5xl font-bold text-gray-100">
                  0{index + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Icon size={20} className="text-gray-700" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;