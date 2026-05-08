import { TrendingDown } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white px-8 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
                <TrendingDown size={13} className="text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-gray-900">Credex</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-400">
              Instant AI spend audits for engineering and ops teams. No login, no fluff — just the numbers.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-300">
                Product
              </p>
              <ul className="space-y-2.5">
                {["Audit Tool", "How It Works", "Pricing Data"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 transition hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-300">
                Company
              </p>
              <ul className="space-y-2.5">
                {["About", "Blog", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 transition hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-300">
                Legal
              </p>
              <ul className="space-y-2.5">
                {["Privacy", "Terms"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 transition hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-gray-300">
            © {new Date().getFullYear()} Credex. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-300">
            Pricing data updated weekly from official vendor pages.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;