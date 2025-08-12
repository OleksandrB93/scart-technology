interface CardEffects {
  boxShadow: string;
  border: string;
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;
}

export const useCardEffects = (
  cardTitle: string,
  isFlipped: boolean
): CardEffects => {
  if (!isFlipped) {
    return {
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderTop: "1px solid rgba(255, 255, 255, 0.15)",
      borderRight: "none",
      borderBottom: "none",
      borderLeft: "none",
    };
  }

  switch (cardTitle) {
    case "Bomb":
      return {
        boxShadow: "0 0px 4px 1px rgba(255, 0, 0, 0.5)",
        border: "1px solid rgba(255, 0, 0, 0.6)",
        borderTop: "1px solid rgba(255, 0, 0, 0.6)",
        borderRight: "1px solid rgba(255, 0, 0, 0.6)",
        borderBottom: "1px solid rgba(255, 0, 0, 0.6)",
        borderLeft: "1px solid rgba(255, 0, 0, 0.6)",
      };

    case "Stop":
      return {
        boxShadow: "0 0px 4px 1px rgba(128, 128, 128, 0.5)",
        border: "1px solid rgba(128, 128, 128, 0.6)",
        borderTop: "1px solid rgba(128, 128, 128, 0.6)",
        borderRight: "1px solid rgba(128, 128, 128, 0.6)",
        borderBottom: "1px solid rgba(128, 128, 128, 0.6)",
        borderLeft: "1px solid rgba(128, 128, 128, 0.6)",
      };

    case "Zero":
      return {
        boxShadow: "0 0px 4px 1px rgba(255, 255, 0, 0.5)",
        border: "1px solid rgba(255, 255, 0, 0.6)",
        borderTop: "1px solid rgba(255, 255, 0, 0.6)",
        borderRight: "1px solid rgba(255, 255, 0, 0.6)",
        borderBottom: "1px solid rgba(255, 255, 0, 0.6)",
        borderLeft: "1px solid rgba(255, 255, 0, 0.6)",
      };

    case "Multiplier":
    case "": // X2 card has an empty title
      return {
        boxShadow: "0 0px 4px 1px rgba(56, 189, 248, 0.5)",
        border: "1px solid rgba(56, 189, 248, 0.6)",
        borderTop: "1px solid rgba(56, 189, 248, 0.6)",
        borderRight: "1px solid rgba(56, 189, 248, 0.6)",
        borderBottom: "1px solid rgba(56, 189, 248, 0.6)",
        borderLeft: "1px solid rgba(56, 189, 248, 0.6)",
      };

    default:
      // Cash cards (1M, 100, 1000, 500, 10K)
      return {
        boxShadow: "0 0px 4px 1px rgb(130, 224, 36, 0.5)",
        border: "1px solid rgb(181, 215, 147)",
        borderTop: "1px solid rgb(181, 215, 147)",
        borderRight: "1px solid rgb(181, 215, 147)",
        borderBottom: "1px solid rgb(181, 215, 147)",
        borderLeft: "1px solid rgb(181, 215, 147)",
      };
  }
};
