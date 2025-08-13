import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimation } from "../contexts/AnimationContext";
import { CashIcon } from "./icons";

interface MultipleAnimatedIconsProps {
  cardId: number;
  isVisible: boolean;
  cardRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
}

const MultipleAnimatedIcons = ({
  cardId,
  isVisible,
  cardRef,
  targetRef,
}: MultipleAnimatedIconsProps) => {
  const { isAnimating, animatedCardId, animationAmount, stopIconAnimation } =
    useAnimation();
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [iconCount, setIconCount] = useState(0);

  useEffect(() => {
    if (
      isAnimating &&
      animatedCardId === cardId &&
      cardRef.current &&
      targetRef.current
    ) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();

      // Calculate icon position within the card (slightly above center)
      const startPos = {
        x: cardRect.left + cardRect.width / 2 - 20,
        y: cardRect.top + cardRect.height / 2 - 20,
      };

      const endPos = {
        x: targetRect.left + targetRect.width / 2 - 20,
        y: targetRect.top + targetRect.height / 2 - 20,
      };

      setStartPosition(startPos);
      setEndPosition(endPos);

      // Calculate number of icons based on amount
      const count = Math.min(
        Math.max(Math.floor(animationAmount / 100), 5),
        20
      );

      setIconCount(count);

      // Автоматично зупиняємо анімацію після завершення
      const animationDuration = 1.5 + count * 0.08; // Тривалість анімації + затримка останньої іконки

      const timer = setTimeout(() => {
        stopIconAnimation();
      }, animationDuration * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    isAnimating,
    animatedCardId,
    cardId,
    cardRef,
    targetRef,
    animationAmount,
    stopIconAnimation,
  ]);

  if (
    !isVisible ||
    !isAnimating ||
    animatedCardId !== cardId ||
    iconCount === 0
  ) {
    return null;
  }

  return (
    <>
      {Array.from({ length: iconCount }).map((_, index) => (
        <motion.div
          key={index}
          className="fixed z-50 pointer-events-none"
          initial={{
            x: startPosition.x,
            y: startPosition.y,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            x: endPosition.x + (Math.random() - 0.5) * 20,
            y: endPosition.y + (Math.random() - 0.5) * 20,
            scale: [0.8, 1.2, 0.6],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: index * 0.08,
            ease: "easeInOut",
            times: [0, 0.3, 1],
          }}
          style={{
            transform: "translate(-50%, -50%)",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <CashIcon />
        </motion.div>
      ))}
    </>
  );
};

export default MultipleAnimatedIcons;
