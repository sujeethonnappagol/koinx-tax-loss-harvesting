export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="#0052FE" />
              <path
                d="M8 16.5L13.5 22L24 10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Koin<span className="text-[#0052FE]">X</span>
            </span>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-[#0052FE] transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-[#0052FE] transition-colors">
            Exchanges
          </a>
          <a href="#" className="hover:text-[#0052FE] transition-colors">
            How it works?
          </a>
          <a href="#" className="hover:text-[#0052FE] transition-colors">
            Blog
          </a>
          <a href="#" className="hover:text-[#0052FE] transition-colors">
            About us
          </a>
        </nav>
        <button className="bg-[#0052FE] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </header>
  );
}
