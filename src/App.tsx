import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";
import { fetchHoldings, fetchCapitalGains } from "./api/mockApi";
import { Holding } from "./data/mockData";
import { Info, Loader2 } from "lucide-react";

interface GainsData {
  stcg: { profits: number; losses: number };
  ltcg: { profits: number; losses: number };
}

function App() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [preHarvest, setPreHarvest] = useState<GainsData | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setPreHarvest(gainsData.capitalGains);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load data"
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Calculate post-harvesting gains based on selection
  const postHarvest = useMemo(() => {
    if (!preHarvest) return null;

    const result: GainsData = {
      stcg: {
        profits: preHarvest.stcg.profits,
        losses: preHarvest.stcg.losses,
      },
      ltcg: {
        profits: preHarvest.ltcg.profits,
        losses: preHarvest.ltcg.losses,
      },
    };

    selected.forEach((idx) => {
      const h = holdings[idx];
      if (!h) return;

      // Short-term
      if (h.stcg.gain > 0) {
        result.stcg.profits += h.stcg.gain;
      } else if (h.stcg.gain < 0) {
        result.stcg.losses += Math.abs(h.stcg.gain);
      }

      // Long-term
      if (h.ltcg.gain > 0) {
        result.ltcg.profits += h.ltcg.gain;
      } else if (h.ltcg.gain < 0) {
        result.ltcg.losses += Math.abs(h.ltcg.gain);
      }
    });

    return result;
  }, [preHarvest, selected, holdings]);

  const preRealised = useMemo(() => {
    if (!preHarvest) return 0;
    const netStcg = preHarvest.stcg.profits - preHarvest.stcg.losses;
    const netLtcg = preHarvest.ltcg.profits - preHarvest.ltcg.losses;
    return netStcg + netLtcg;
  }, [preHarvest]);

  const postRealised = useMemo(() => {
    if (!postHarvest) return 0;
    const netStcg = postHarvest.stcg.profits - postHarvest.stcg.losses;
    const netLtcg = postHarvest.ltcg.profits - postHarvest.ltcg.losses;
    return netStcg + netLtcg;
  }, [postHarvest]);

  const savings =
    preRealised > postRealised ? preRealised - postRealised : null;

  const handleToggle = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (selected.size === holdings.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(holdings.map((_, i) => i)));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page title + note */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Tax Loss Harvesting
            </h1>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-[#0052FE] shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 mb-1">
                Important Note on Tax-Loss Harvesting
              </p>
              <p>
                Tax-loss harvesting allows you to sell investments at a loss to
                offset capital gains tax liability. Select the holdings you want
                to harvest. The “After Harvesting” view updates in real-time to
                show the impact on your realised capital gains.
              </p>
            </div>
          </div>
        </div>

        {/* Loading / Error states */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 text-[#0052FE] animate-spin" />
            <p className="text-slate-600 font-medium">Loading your data…</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium mb-2">Something went wrong</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && preHarvest && postHarvest && (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <CapitalGainsCard
                title="Pre Harvesting"
                data={preHarvest}
                variant="pre"
              />
              <CapitalGainsCard
                title="After Harvesting"
                data={postHarvest}
                variant="post"
                savings={savings}
              />
            </div>

            {/* Holdings Table */}
            <HoldingsTable
              holdings={holdings}
              selected={selected}
              onToggle={handleToggle}
              onToggleAll={handleToggleAll}
            />
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} KoinX · Tax Loss Harvesting Assignment
        </div>
      </footer>
    </div>
  );
}

export default App;
