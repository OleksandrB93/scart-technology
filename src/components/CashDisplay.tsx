import { motion } from "framer-motion";
import CashIcon from "./icons/CashIcon";
import { formatCash } from "../utils/utils";
import { useAnimation } from "../contexts/AnimationContext";
import CounterUp from "./CounterUp";

interface CashDisplayProps {
  cash: number;
  cashIconRef: React.RefObject<HTMLDivElement | null>;
}

const CashDisplay = ({ cash, cashIconRef }: CashDisplayProps) => {
  const { isAnimating } = useAnimation();

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
          delay: 1.5,
        }}
      >
        <CashIcon />
      </motion.div>
      <div className="ml-2">
        <CounterUp
          value={cash}
          duration={0.8}
          className={`font-inter text-md font-extrabold transition-all ${
            isAnimating ? "text-green-300" : "text-white"
          }`}
          formatFunction={formatCash}
        />
      </div>
    </div>
  );
};

export default CashDisplay;
