import { motion } from "framer-motion";
import CashIcon from "./icons/CashIcon";

interface CashDisplayProps {
  cash: number;
  cashIconRef: React.RefObject<HTMLDivElement | null>;
}

const CashDisplay = ({ cash, cashIconRef }: CashDisplayProps) => {
  // Format large numbers for better readability
  const formatCash = (amount: number): string => {
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

  return (
    <div className="flex items-center justify-center mb-10">
      <motion.div
        ref={cashIconRef}
        data-cash-icon
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 0.5,
          delay: 1.5, // Delay until most icons have arrived
        }}
      >
        <CashIcon />
      </motion.div>
      <motion.div
        className="font-inter text-md font-extrabold text-white ml-2"
        key={cash}
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {formatCash(cash)}
      </motion.div>
    </div>
  );
};

export default CashDisplay;
