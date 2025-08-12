import { motion } from "framer-motion";
import CashIcon from "./icons/CashIcon";
import { formatCash } from "../utils/utils";

interface CashDisplayProps {
  cash: number;
  cashIconRef: React.RefObject<HTMLDivElement | null>;
}

const CashDisplay = ({ cash, cashIconRef }: CashDisplayProps) => {
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
        className="font-inter text-md font-extrabold  text-green-300text-white ml-2"
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
