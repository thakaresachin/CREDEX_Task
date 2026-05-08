import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Share2, Mail, Building2, User, Users, Sparkles, Copy, Check,
  Loader2, ArrowLeft, TrendingDown, Calendar, ArrowUpRight,
  ArrowRight, CheckCircle, AlertTriangle, XCircle, ChevronRight,
  Zap, DollarSign, BarChart3,
} from "lucide-react";
import API from "../services/api";

// ─── Severity config ────────────────────────────────────────────────────────
const severityConfig = {
  high: {
    border: "border-red-100",
    headerBg: "bg-red-50",
    badge: "bg-red-100 text-red-600 border border-red-200",
    savingsBg: "bg-red-50 text-red-600",
    icon: XCircle,
    label: "High Overspend",
    dot: "bg-red-500",
  },
  medium: {
    border: "border-amber-100",
    headerBg: "bg-amber-50",
    badge: "bg-amber-50 text-amber-600 border border-amber-200",
    savingsBg: "bg-amber-50 text-amber-700",
    icon: AlertTriangle,
    label: "Moderate",
    dot: "bg-amber-400",
  },
  low: {
    border: "border-emerald-100",
    headerBg: "bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    savingsBg: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle,
    label: "Optimized",
    dot: "bg-emerald-400",
  },
};

const getSeverity = (savings, currentSpend) => {
  if (!currentSpend || currentSpend === 0) return "low";
  const pct = savings / currentSpend;
  if (pct > 0.3) return "high";
  if (pct > 0.1) return "medium";
  return "low";
};

// ─── AuditCard ───────────────────────────────────────────────────────────────
const AuditCard = ({ item, index }) => {
  const severity = item.severity || getSeverity(item.savings, item.currentSpend);
  const config = severityConfig[severity] || severityConfig.medium;
  const SeverityIcon = config.icon;
  const savingsPct =
    item.currentSpend > 0
      ? Math.round((item.savings / item.currentSpend) * 100)
      : 0;

  return (
    <div
      className={`group relative rounded-2xl border ${config.border} bg-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${config.dot}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${config.headerBg} flex items-center justify-center shrink-0`}>
              <BarChart3 size={15} className={severity === "high" ? "text-red-500" : severity === "medium" ? "text-amber-500" : "text-emerald-500"} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">{item.tool}</h3>
              {item.plan && <p className="text-xs text-gray-400 mt-0.5">{item.plan}</p>}
            </div>
          </div>
          <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${config.badge}`}>
            <SeverityIcon size={9} />
            {config.label}
          </span>
        </div>

        {/* Spend comparison */}
        <div className="flex items-stretch gap-2 mb-3">
          <div className="flex-1 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Current</p>
            <p className="text-lg font-bold text-gray-800 leading-none">
              ${item.currentSpend}
              <span className="text-xs font-normal text-gray-400 ml-0.5">/mo</span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-1">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <ArrowRight size={11} className="text-gray-400" />
            </div>
            {savingsPct > 0 && (
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                −{savingsPct}%
              </span>
            )}
          </div>

          <div className="flex-1 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Optimized</p>
            <p className="text-lg font-bold text-emerald-700 leading-none">
              ${item.recommendedSpend}
              <span className="text-xs font-normal text-emerald-500 ml-0.5">/mo</span>
            </p>
          </div>
        </div>

        {/* Savings chip */}
        {item.savings > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 mb-3">
            <TrendingDown size={12} className="shrink-0 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">
              Save <span className="text-gray-900 font-semibold">${item.savings}/mo</span> · <span className="text-gray-900 font-semibold">${item.savings * 12}/yr</span>
            </span>
          </div>
        )}

        {/* Recommendation */}
        <p className="text-xs leading-relaxed text-gray-500">{item.recommendation}</p>

        {item.actionUrl && (
          <a
            href={item.actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            See pricing <ChevronRight size={10} />
          </a>
        )}
      </div>
    </div>
  );
};

// ─── StatCard ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon: Icon, accent }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6">
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.06] -translate-y-8 translate-x-8 ${accent}`} />
    <div className={`w-10 h-10 rounded-xl ${accent} bg-opacity-10 flex items-center justify-center mb-4`}>
      <Icon size={18} className={`${accent.replace("bg-", "text-")}`} />
    </div>
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

// ─── InputField ──────────────────────────────────────────────────────────────
const InputField = ({ icon: Icon, type = "text", name, value, onChange, placeholder }) => (
  <div className="relative group">
    <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-400 transition-colors" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-300 transition-all focus:border-indigo-300 focus:bg-white focus:ring-3 focus:ring-indigo-50"
    />
  </div>
);

// ─── Result ──────────────────────────────────────────────────────────────────
const Result = () => {
  const [auditData, setAuditData] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadData, setLeadData] = useState({ email: "", companyName: "", role: "", teamSize: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("auditData"));
    if (stored) {
      setAuditData(stored);
      fetchSummary(stored.audit?._id);
    }
  }, []);

  const fetchSummary = async (auditId) => {
    if (!auditId) return;
    setSummaryLoading(true);
    try {
      const res =  await  API.post("/ai/summary", { auditId });
      setSummary(res.data.summary);
    } catch {
      setSummary(
        "Based on your current AI tool stack, there are clear opportunities to optimize your spend. The audit identified overlapping capabilities across tools and plans that exceed your team's actual usage patterns. Switching to right-sized plans or alternatives could significantly reduce your monthly AI infrastructure costs without impacting productivity."
      );
    }
    setSummaryLoading(false);
  };

  const handleLeadChange = (e) => setLeadData({ ...leadData, [e.target.name]: e.target.value });

  const saveLead = async () => {
  if (!leadData.email) return;
  setLeadLoading(true);
  try {
    await API.post("/leads/save", { 
      ...leadData, 
      summary, 
      auditId: auditData.audit._id 
    }, {
      timeout: 30000 // 30 second timeout
    });
    setLeadSaved(true);
  } catch (err) {
    console.error("Lead save error:", err);
    alert("Failed to send report. Please check your connection and try again.");
  } finally {
    setLeadLoading(false); // ← Always resets, even on timeout
  }
};

  const copyShareLink = () => {
    const url = auditData?.audit?.shareId
      ? `${window.location.origin}/share/${auditData.audit.shareId}`
      : window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!auditData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-2">
          <BarChart3 size={20} className="text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">No audit data found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={13} /> Run an audit
        </Link>
      </div>
    );
  }

  const monthlySavings = auditData.totalMonthlySavings;
  const annualSavings = auditData.totalAnnualSavings;
  const isHighSavings = monthlySavings > 500;
  const isOptimal = monthlySavings < 50;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={14} />
            New audit
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:block">Share this report</span>
            <button
              onClick={copyShareLink}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 space-y-8">

        {/* Hero section */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-500">Audit complete</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            You could save{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              ${monthlySavings.toLocaleString()}/mo
            </span>
          </h1>
          <p className="mt-2 text-gray-500 text-base">
            Here's a breakdown of what we found and how to optimize your AI stack.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard
            label="Monthly savings"
            value={`$${monthlySavings.toLocaleString()}`}
            sub="if optimized today"
            icon={TrendingDown}
            accent="bg-indigo-500"
          />
          <StatCard
            label="Annual savings"
            value={`$${annualSavings.toLocaleString()}`}
            sub="per year"
            icon={Calendar}
            accent="bg-violet-500"
          />
          <div className="col-span-2 sm:col-span-1">
            {isHighSavings && (
              <div className="h-full rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 flex flex-col justify-between">
                <div>
                  <Zap size={18} className="text-indigo-200 mb-3" />
                  <p className="text-white font-semibold text-sm leading-snug">
                    Significant savings detected
                  </p>
                  <p className="text-indigo-200 text-xs mt-1 leading-relaxed">
                    Book a free Credex consultation to capture these with discounted credits.
                  </p>
                </div>
               
              </div>
            )}
            {isOptimal && (
              <div className="h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex flex-col justify-between">
                <div>
                  <CheckCircle size={18} className="text-emerald-100 mb-3" />
                  <p className="text-white font-semibold text-sm">You're spending well ✓</p>
                  <p className="text-emerald-100 text-xs mt-1 leading-relaxed">
                    Your AI stack is close to optimal for your team size and usage.
                  </p>
                </div>
              </div>
            )}
            {!isHighSavings && !isOptimal && (
              <StatCard
                label="Tools audited"
                value={auditData.recommendations.length}
                sub="across your stack"
                icon={BarChart3}
                accent="bg-emerald-500"
              />
            )}
          </div>
        </div>

        {/* Per-tool breakdown */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              Per-tool breakdown
            </p>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">{auditData.recommendations.length} tools</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {auditData.recommendations.map((item, i) => (
              <AuditCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                <Sparkles size={14} className="text-indigo-500" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">AI-generated audit summary</h2>
              
            </div>
          </div>
          <div className="px-6 py-5">
            {summaryLoading ? (
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Loader2 size={14} className="animate-spin text-indigo-400" />
                Generating personalized summary…
              </div>
            ) : (
              <p className="text-sm leading-7 text-gray-500">{summary}</p>
            )}
          </div>
        </div>

        {/* Lead capture */}
        <div className="rounded-2xl bg-white border border-gray-100 p-6">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
              <Mail size={15} className="text-indigo-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Email me this report</h2>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Get a PDF copy with full reasoning. High-savings cases will hear from the Credex team about discounted credits.
              </p>
            </div>
          </div>

          {leadSaved ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Check size={13} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">Report sent!</p>
                <p className="text-xs text-emerald-600">Check your inbox — it should arrive within a few minutes.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField icon={Mail} type="email" name="email" value={leadData.email} onChange={handleLeadChange} placeholder="Work email *" />
                <InputField icon={Building2} name="companyName" value={leadData.companyName} onChange={handleLeadChange} placeholder="Company name" />
                <InputField icon={User} name="role" value={leadData.role} onChange={handleLeadChange} placeholder="Your role" />
                <InputField icon={Users} type="number" name="teamSize" value={leadData.teamSize} onChange={handleLeadChange} placeholder="Team size" />
                <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={saveLead}
                  disabled={leadLoading || !leadData.email}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {leadLoading ? <Loader2 size={13} className="animate-spin" /> : <Mail size={13} />}
                  {leadLoading ? "Sending…" : "Send report to my email"}
                </button>
                <p className="text-xs text-gray-300 hidden sm:block">No spam, ever.</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 pb-4">
          Powered by Credex · AI spend intelligence
        </p>
      </div>
    </div>
  );
};

export default Result;