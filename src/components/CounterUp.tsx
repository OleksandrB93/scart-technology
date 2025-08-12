import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface CounterUpProps {
  value: number;
  duration?: number;
  className?: string;
  formatFunction?: (value: number) => string;
}

const CounterUp = ({
  value,
  duration = 0.8,
  className = "",
  formatFunction = (val: number) => val.toString(),
}: CounterUpProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const count = useMotionValue(displayValue);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return controls.stop;
  }, [value, count, duration]);

  return (
    <motion.span
      className={className}
      key={value}
      initial={{ scale: 1.1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {formatFunction(displayValue)}
    </motion.span>
  );
};

export default CounterUp;
