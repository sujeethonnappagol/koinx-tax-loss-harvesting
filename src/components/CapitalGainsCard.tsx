import { formatCurrency } from "../utils/format";

interface GainsData {
  stcg: { profits: number; losses: number };
  ltcg: { profits: number; losses: number };
}

interface CapitalGainsCardProps {
  title: string;
  data: GainsData;
  variant: "pre" | "post";
  savings?: number | null;
}

export default function CapitalGainsCard({
  title,
  data,
  variant,
  savings,
}: CapitalGainsCardProps) {
  const netStcg = data.stcg.profits - data.stcg.losses;
  const netLtcg = data.ltcg.profits - data.ltcg.losses;
  const realised = netStcg + netLtcg;

  const isDark = variant === "pre";

  const bg = isDark ? "bg-[#0F1629]" : "bg-[#0052FE]";
  const textMuted = isDark ? "text-slate-400" : "text-blue-100";
  const textMain = "text-white";
  const borderColor = isDark ? "border-slate-700" : "border-blue-400/40";

  return (
    <div
      className={`${bg} rounded-xl p-5 sm:p-6 shadow-lg flex flex-col h-full transition-all duration-300`}
    >
      <h3 className={`${textMain} text-lg font-semibold mb-5`}>{title}</h3>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-xs sm:text-sm">
        <div className={textMuted}></div>
        <div className={`${textMuted} text-right font-medium`}>Short-term</div>
        <div className={`${textMuted} text-right font-medium`}>Long-term</div>
      </div>

      {/* Profits */}
      <div className="grid grid-cols-3 gap-2 py-2.5 border-b border-white/10">
        <div className={`${textMuted} text-sm`}>Profits</div>
        <div className={`${textMain} text-right text-sm font-medium`}>
          {formatCurrency(data.stcg.profits)}
        </div>
        <div className={`${textMain} text-right text-sm font-medium`}>
          {formatCurrency(data.ltcg.profits)}
        </div>
      </div>

      {/* Losses */}
      <div className="grid grid-cols-3 gap-2 py-2.5 border-b border-white/10">
        <div className={`${textMuted} text-sm`}>Losses</div>
        <div className={`${textMain} text-right text-sm font-medium`}>
          -{formatCurrency(data.stcg.losses)}
        </div>
        <div className={`${textMain} text-right text-sm font-medium`}>
          -{formatCurrency(data.ltcg.losses)}
        </div>
      </div>

      {/* Net Capital Gains */}
      <div className="grid grid-cols-3 gap-2 py-2.5 border-b border-white/10">
        <div className={`${textMuted} text-sm`}>Net Capital Gains</div>
        <div
          className={`${textMain} text-right text-sm font-semibold ${
            netStcg < 0 ? "text-red-300" : ""
          }`}
        >
          {formatCurrency(netStcg)}
        </div>
        <div
          className={`${textMain} text-right text-sm font-semibold ${
            netLtcg < 0 ? "text-red-300" : ""
          }`}
        >
          {formatCurrency(netLtcg)}
        </div>
      </div>

      {/* Realised Capital Gains */}
      <div className="mt-5 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className={`${textMain} font-semibold text-base`}>
            {variant === "pre"
              ? "Realised Capital Gains:"
              : "Effective Capital Gains:"}
          </span>
          <span
            className={`${textMain} text-xl sm:text-2xl font-bold tracking-tight`}
          >
            {formatCurrency(realised)}
          </span>
        </div>
      </div>

      {/* Savings message */}
      {variant === "post" && savings !== null && savings !== undefined && savings > 0 && (
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-white font-medium text-sm sm:text-base flex items-center gap-2">
            <span className="text-lg">🎉</span>
            You are going to save upto{" "}
            <span className="font-bold">{formatCurrency(savings)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
