import { useState } from "react";
import { Holding } from "../data/mockData";
import { formatCurrency, formatNumber, formatGain, getGainColor } from "../utils/format";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HoldingsTableProps {
  holdings: Holding[];
  selected: Set<number>;
  onToggle: (index: number) => void;
  onToggleAll: () => void;
}

const INITIAL_VISIBLE = 5;

export default function HoldingsTable({
  holdings,
  selected,
  onToggle,
  onToggleAll,
}: HoldingsTableProps) {
  const [showAll, setShowAll] = useState(false);

  const displayCount = showAll ? holdings.length : Math.min(INITIAL_VISIBLE, holdings.length);

  const allSelected =
    holdings.length > 0 && selected.size === holdings.length;
  const someSelected = selected.size > 0 && selected.size < holdings.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Holdings</h2>
        <span className="text-sm text-slate-500">
          {selected.size} of {holdings.length} selected
        </span>
      </div>

      <div className="overflow-x-auto table-scroll">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-left">
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={onToggleAll}
                  className="w-4 h-4 rounded border-slate-300 text-[#0052FE] focus:ring-[#0052FE] cursor-pointer"
                  aria-label="Select all holdings"
                />
              </th>
              <th className="px-3 py-3 font-medium">Asset</th>
              <th className="px-3 py-3 font-medium text-right">
                Holdings
                <br />
                <span className="text-xs font-normal text-slate-400">
                  Avg Buy Price
                </span>
              </th>
              <th className="px-3 py-3 font-medium text-right">
                Current Price
              </th>
              <th className="px-3 py-3 font-medium text-right">
                Short-Term Gain
              </th>
              <th className="px-3 py-3 font-medium text-right">
                Long-Term Gain
              </th>
              <th className="px-3 py-3 font-medium text-right">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {holdings.slice(0, displayCount).map((holding, idx) => {
              const isSelected = selected.has(idx);

              return (
                <tr
                  key={`${holding.coin}-${holding.coinName}-${idx}`}
                  className={`border-t border-slate-100 transition-colors ${
                    isSelected
                      ? "bg-blue-50/70"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(idx)}
                      className="w-4 h-4 rounded border-slate-300 text-[#0052FE] focus:ring-[#0052FE] cursor-pointer"
                      aria-label={`Select ${holding.coin}`}
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        className="w-8 h-8 rounded-full object-cover bg-slate-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate max-w-[140px]">
                          {holding.coin}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[160px]">
                          {holding.coinName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <div className="font-medium text-slate-900">
                      {formatNumber(holding.totalHolding)}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatCurrency(holding.averageBuyPrice)}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right font-medium text-slate-900">
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <div
                      className={`font-medium ${getGainColor(
                        holding.stcg.gain
                      )}`}
                    >
                      {formatGain(holding.stcg.gain)}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatNumber(holding.stcg.balance)}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <div
                      className={`font-medium ${getGainColor(
                        holding.ltcg.gain
                      )}`}
                    >
                      {formatGain(holding.ltcg.gain)}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatNumber(holding.ltcg.balance)}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right font-medium text-slate-700">
                    {isSelected ? formatNumber(holding.totalHolding) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > INITIAL_VISIBLE && (
        <div className="px-4 sm:px-6 py-3 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#0052FE] hover:text-blue-700 transition-colors"
          >
            {showAll ? (
              <>
                View Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View All ({holdings.length}) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
