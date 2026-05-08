import React from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pricing = [
  {
    tool: "ChatGPT Plus",
    price: "$20/user/month",
    url: "https://openai.com/chatgpt/pricing",
  },

  {
    tool: "ChatGPT Team",
    price: "$30/user/month",
    url: "https://openai.com/chatgpt/pricing",
  },

  {
    tool: "Claude Pro",
    price: "$20/user/month",
    url: "https://www.anthropic.com/pricing",
  },

  {
    tool: "Gemini Advanced",
    price: "$20/user/month",
    url: "https://gemini.google.com",
  },

  {
    tool: "Cursor Pro",
    price: "$20/user/month",
    url: "https://cursor.sh/pricing",
  },

  {
    tool: "GitHub Copilot",
    price: "$10/user/month",
    url: "https://github.com/features/copilot",
  },

  {
    tool: "OpenAI API",
    price: "Usage-based pricing",
    url: "https://platform.openai.com/pricing",
  },

  {
    tool: "Anthropic API",
    price: "Usage-based pricing",
    url: "https://www.anthropic.com/pricing",
  },

  {
    tool: "Windsurf",
    price: "$15/user/month",
    url: "https://codeium.com/windsurf",
  },
];

const PricingData = () => {
  const navigate = useNavigate();

  const handleAuditScroll = () => {
    navigate("/", { state: { scrollToAudit: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Pricing Intelligence
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900">
            Verified AI pricing data
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            SpendLens uses publicly available pricing information from official
            vendor websites. Pricing data is reviewed and updated regularly.
          </p>

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

        <div className="mt-16 overflow-hidden rounded-3xl border border-gray-200 bg-white">
          {pricing.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-100 px-8 py-6 last:border-none"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.tool}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Official monthly pricing
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-lg font-bold text-gray-900">{item.price}</p>
                
                 <a
  href={item.url}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-gray-900"
>
  Source
  <ExternalLink size={14} />
</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingData;