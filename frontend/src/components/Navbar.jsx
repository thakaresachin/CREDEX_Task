import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing-data", label: "Pricing Data" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleAuditScroll = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToAudit: true } });
    } else {
      document.getElementById("audit-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur transition-all duration-300 ${
          scrolled ? "border-b border-gray-100 shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span
              className="text-[18px] font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Credex
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              AI Spend Audit
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative text-[13px] font-medium transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gray-900 after:transition-all after:duration-200 hover:text-gray-900 hover:after:w-full ${
                  location.pathname === to
                    ? "text-gray-900 after:w-full"
                    : "text-gray-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA — hidden on very small screens, shown md+ */}
            <button
              onClick={handleAuditScroll}
              className="group hidden items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-gray-700 sm:flex"
            >
              Start Free Audit
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                    location.pathname === to
                      ? "bg-gray-50 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <button
                onClick={handleAuditScroll}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-[14px] font-semibold text-white transition hover:bg-gray-700"
              >
                Start Free Audit
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;