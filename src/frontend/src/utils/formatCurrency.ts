export function formatCurrency(amount: number): string {
  if (amount === 0) return "₹0";
  const absAmount = Math.abs(amount);
  let result = "";
  const str = absAmount.toString();
  const decimal = str.includes(".") ? `.${str.split(".")[1]}` : "";
  const intPart = str.split(".")[0];
  if (intPart.length <= 3) {
    result = intPart;
  } else {
    const last3 = intPart.slice(-3);
    const remaining = intPart.slice(0, -3);
    const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    result = `${formatted},${last3}`;
  }
  return (amount < 0 ? "-₹" : "₹") + result + decimal;
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return formatCurrency(amount);
}
