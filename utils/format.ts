export const formatCurrency = (amount: number | null) => {
  const value = amount ?? 0;
  if (value >= 1_000_000) {
    if (value >= 1_000_000_000) {
      return `₦${(value / 1_000_000_000).toFixed(1)}B`;
    }
    return `₦${(value / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatDateMonthAndYear = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
};
