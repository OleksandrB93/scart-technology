// Format large numbers for better readability
export const formatCash = (amount: number): string => {
  if (amount >= 1000000000) {
    const value = (amount / 1000000000).toFixed(1);
    return `${value.endsWith(".0") ? value.slice(0, -2) : value}B`;
  } else if (amount >= 1000000) {
    const value = (amount / 1000000).toFixed(1);
    return `${value.endsWith(".0") ? value.slice(0, -2) : value}M`;
  } else if (amount >= 1000) {
    const value = (amount / 1000).toFixed(1);
    return `${value.endsWith(".0") ? value.slice(0, -2) : value}K`;
  }
  return amount.toString();
};

// Parse card amount string to number
export const parseCardAmount = (amount: string): number => {
  // Handle special cards
  if (
    amount === "x2" ||
    amount === "stop" ||
    amount === "bomb" ||
    amount === "0"
  ) {
    return 0; // These cards don't add cash directly
  }

  // Handle K, M, B suffixes
  if (amount.endsWith("K")) {
    return parseInt(amount.slice(0, -1)) * 1000;
  } else if (amount.endsWith("M")) {
    return parseInt(amount.slice(0, -1)) * 1000000;
  } else if (amount.endsWith("B")) {
    return parseInt(amount.slice(0, -1)) * 1000000000;
  }

  // Handle plain numbers
  return parseInt(amount) || 0;
};

// Check if card is a special action card
export const isSpecialCard = (amount: string): boolean => {
  return ["x2", "stop", "bomb", "0"].includes(amount);
};
