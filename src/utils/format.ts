export function formatCurrency(value: number, decimals = 2): string {
  if (Math.abs(value) < 0.01 && value !== 0) {
    return value.toExponential(2);
  }
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return value < 0 ? `-₹${formatted}` : `₹${formatted}`;
}

export function formatNumber(value: number, maxDecimals = 6): string {
  if (value === 0) return "0";
  if (Math.abs(value) < 1e-6) {
    return value.toExponential(2);
  }
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  }
  // Trim trailing zeros
  const str = value.toFixed(maxDecimals);
  return parseFloat(str).toString();
}

export function formatGain(value: number): string {
  if (Math.abs(value) < 0.01 && value !== 0) {
    return value.toExponential(2);
  }
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (value > 0) return `₹${formatted}`;
  if (value < 0) return `-₹${formatted}`;
  return `₹0.00`;
}

export function getGainColor(value: number): string {
  if (value > 0) return "text-emerald-500";
  if (value < 0) return "text-red-500";
  return "text-slate-500";
}
