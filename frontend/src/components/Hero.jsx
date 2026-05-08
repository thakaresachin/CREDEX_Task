import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  Trash2,
  ChevronDown,
  Loader2,
  Sparkles,
  Info,
  TrendingDown,
  ShieldCheck,
  Zap,
} from "lucide-react";
import API from "../services/api";

const TOOLS = {
  ChatGPT: ["Free", "Plus", "Team", "Enterprise", "API Direct"],
  Claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API Direct"],
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  "Anthropic API": ["API Direct"],
  "OpenAI API": ["API Direct"],
  Gemini: ["Free", "Pro", "Ultra", "API Direct"],
  Windsurf: ["Free", "Pro", "Team", "Enterprise"],
};

const USE_CASES = [
  { value: "coding", label: "Coding & Development" },
  { value: "writing", label: "Writing & Content" },
  { value: "research", label: "Research & Analysis" },
  { value: "data", label: "Data & Analytics" },
  { value: "mixed", label: "Mixed / General" },
];

const defaultTool = () => ({
  id: Date.now(),
  toolName: "ChatGPT",
  plan: "Team",
  monthlySpend: "",
  seats: "",
});

const STORAGE_KEY = "spendform_state";

const labelClass =
  "block mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400";
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-300 transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";
const selectWrapClass = "relative";
const selectClass =
  "w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";

const StatPill = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
    <Icon size={13} className="text-gray-400" />
    {text}
  </div>
);

const SelectField = ({ label, name, value, onChange, children }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <div className={selectWrapClass}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
      >
        {children}
      </select>
      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  </div>
);

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min="0"
      className={inputClass}
      required
    />
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("coding");
  const [tools, setTools] = useState([defaultTool()]);

  // Scroll to audit form — works from both: direct hash nav AND About page CTA
 useEffect(() => {
  if (!location.state?.scrollToAudit) return;

  const el = document.getElementById("audit-form");
  if (!el) return;

  // Use requestAnimationFrame to ensure DOM is painted before scrolling
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Clear the state so back-navigation doesn't re-scroll
  window.history.replaceState({}, "");
}, [location.state]);

  // Restore form state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { teamSize: ts, useCase: uc, tools: t } = JSON.parse(saved);
        if (ts) setTeamSize(ts);
        if (uc) setUseCase(uc);
        if (t) setTools(t);
      } catch (_) {}
    }
  }, []);

  // Persist form state to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ teamSize, useCase, tools }),
    );
  }, [teamSize, useCase, tools]);

  const updateTool = (id, field, value) => {
    setTools((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, [field]: value };
        if (field === "toolName") updated.plan = TOOLS[value][0];
        return updated;
      }),
    );
  };

  const addTool = () => {
    if (tools.length >= 8) return;
    setTools((prev) => [...prev, { ...defaultTool(), id: Date.now() }]);
  };

  const removeTool = (id) => {
    if (tools.length === 1) return;
    setTools((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToAuditForm = () => {
    const element = document.getElementById("audit-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        tools: tools.map(({ toolName, plan, monthlySpend, seats }) => ({
          toolName,
          plan,
          monthlySpend: Number(monthlySpend),
          seats: Number(seats),
        })),
        teamSize: Number(teamSize),
        useCase,
      };
      const res = await API.post("/audit/calculate", payload);
      localStorage.setItem("auditData", JSON.stringify(res.data));
      navigate("/result");
    } catch (error) {
      console.error(error);
      alert("Audit failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="relative px-8 pt-8 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Free AI Spend Audit — No Login Required
          </p>

          <h1
            className="text-6xl font-bold leading-[1.06] tracking-tight text-gray-900 md:text-7xl lg:text-[82px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Stop overpaying for
            <br />
            <span
              className="italic font-normal text-gray-400"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              AI tools you barely use
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-gray-500 font-normal">
            Enter what you're paying for Cursor, Claude, ChatGPT, Copilot, and
            more — get an instant audit showing exactly where you're burning
            money.
          </p>

          <button
            onClick={scrollToAuditForm}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-gray-700"
          >
            Audit My AI Stack
            <Sparkles
              size={15}
              className="transition-transform group-hover:rotate-12"
            />
          </button>

          {/* Trust pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <StatPill icon={ShieldCheck} text="No credit card required" />
            <StatPill icon={TrendingDown} text="Avg. $340/mo savings found" />
            <StatPill icon={Zap} text="Results in under 30 seconds" />
          </div>

          {/* Stats row */}
          <div className="mt-20 border-t border-gray-100 pt-16 grid grid-cols-3 gap-8 text-left">
            <div>
              <p className="text-5xl font-bold text-gray-900 tracking-tight">
                $340
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Average monthly savings found per team audited
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-gray-900 tracking-tight">
                8/10
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Teams are paying for plans they don't fully use
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-gray-900 tracking-tight">
                30s
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                To get a full audit report on your entire AI stack
              </p>
            </div>
          </div>

          {/* Tool strip */}
          <div className="mt-16">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300">
              Audits tools including
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {Object.keys(TOOLS).map((tool) => (
                <span
                  key={tool}
                  className="text-sm font-medium text-gray-300 hover:text-gray-600 transition-colors cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-gray-100" />

      {/* ── FORM ── */}
      <section
        id="audit-form"
        className="scroll-mt-32 relative bg-gray-50 px-8 py-20"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Enter your AI tool stack
            </h2>
            <p className="mt-3 text-[15px] text-gray-500">
              Add all the AI tools your team pays for — we'll find where you're
              overspending.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              {tools.map((tool, idx) => (
                <div
                  key={tool.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">
                      {idx + 1}
                    </span>
                    {tools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTool(tool.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-red-500"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="AI Tool"
                      name="toolName"
                      value={tool.toolName}
                      onChange={(e) =>
                        updateTool(tool.id, "toolName", e.target.value)
                      }
                    >
                      {Object.keys(TOOLS).map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </SelectField>

                    <SelectField
                      label="Current Plan"
                      name="plan"
                      value={tool.plan}
                      onChange={(e) =>
                        updateTool(tool.id, "plan", e.target.value)
                      }
                    >
                      {(TOOLS[tool.toolName] || []).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </SelectField>

                    <InputField
                      label="Monthly Spend ($)"
                      name="monthlySpend"
                      value={tool.monthlySpend}
                      onChange={(e) =>
                        updateTool(tool.id, "monthlySpend", e.target.value)
                      }
                      placeholder="e.g. 200"
                    />

                    <InputField
                      label="Seats / Licenses"
                      name="seats"
                      value={tool.seats}
                      onChange={(e) =>
                        updateTool(tool.id, "seats", e.target.value)
                      }
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>
              ))}
            </div>

            {tools.length < 8 && (
              <button
                type="button"
                onClick={addTool}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-3.5 text-sm font-medium text-gray-400 transition hover:border-gray-400 hover:text-gray-600"
              >
                <Plus size={14} />
                Add Another Tool
              </button>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <InputField
                label="Total Team Size"
                name="teamSize"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="e.g. 12"
              />
              <SelectField
                label="Primary Use Case"
                name="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
              >
                {USE_CASES.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
              <Info size={13} className="mt-0.5 shrink-0 text-gray-400" />
              <p className="text-xs leading-relaxed text-gray-500">
                Pricing data is sourced from official vendor pages and updated
                weekly. All audit math is hardcoded — no AI hallucinations in
                the numbers.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gray-900 py-4 text-[15px] font-semibold text-white transition-all hover:bg-gray-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Analyzing Your Spend...
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Generate My Audit Report
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Hero;
