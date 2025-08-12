import { motion } from "framer-motion";
import CashIcon from "./icons/CashIcon";
import { formatCash } from "../utils/utils";
import { useAnimation } from "../contexts/AnimationContext";

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
      <motion.div
        className={`font-inter text-md font-extrabold ml-2 transition-all ${
          isAnimating ? "text-green-300" : "text-white"
        }`}
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
