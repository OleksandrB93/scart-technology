import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { randomCardList } from "../configs/random-card";
import { useCardEffects } from "../hooks/useCardEffects";
import MultipleAnimatedIcons from "./MultipleAnimatedIcons";
import { parseCardAmount, isSpecialCard } from "../utils/utils";
import { useAnimation } from "../contexts/AnimationContext";

interface CardProps {
  id: number;
  cardData: (typeof randomCardList)[0];
  isFlipped: boolean;
  onFlip: (id: number) => void;
  setCash: (cash: number | ((prevCash: number) => number)) => void;
  onBombTrigger: () => void;
  onGameOver: () => void;
  gameEnded: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
}

const Card = ({
  id,
  cardData,
  isFlipped,
  onFlip,
  setCash,
  onBombTrigger,
  onGameOver,
  gameEnded,
  targetRef,
}: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [pendingAnimation, setPendingAnimation] = useState<{
    id: number;
    amount: number;
  } | null>(null);
  const cardRef = useRef<HTMLLIElement>(null);
  const { startIconAnimation } = useAnimation();

  // Get card effects based on type and flip state
  const cardEffects = useCardEffects(cardData.title, isFlipped);

  // Need to check if the image is loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = cardData.bg;
  }, [cardData.bg]);

  // Check if this is a cash card with CashIcon
  const isCashCard = !isSpecialCard(cardData.amount);

  // Run icon animation after flip
  useEffect(() => {
    console.log(`[Card ${id}] useEffect triggered:`, {
      isFlipped,
      pendingAnimation,
      pendingAnimationId: pendingAnimation?.id,
      currentId: id,
      isCashCard,
    });

    if (isFlipped && pendingAnimation && pendingAnimation.id === id) {
      console.log(
        `[Card ${id}] Starting icon animation for amount:`,
        pendingAnimation.amount
      );
      // Run icon animation immediately after flip
      startIconAnimation(pendingAnimation.id, pendingAnimation.amount);
      setPendingAnimation(null);
    }
  }, [isFlipped, pendingAnimation, id, startIconAnimation, isCashCard]);

  const handleClick = () => {
    console.log(`[Card ${id}] handleClick called:`, {
      isFlipped,
      gameEnded,
      cardAmount: cardData.amount,
      isCashCard,
    });

    if (!isFlipped && !gameEnded) {
      console.log(`[Card ${id}] Flipping card`);
      onFlip(id);

      // Handle different card types based on amount field
      switch (cardData.amount) {
        case "bomb":
          // Bomb triggers game end
          console.log(`[Card ${id}] Bomb triggered`);
          onBombTrigger();
          break;
        case "stop":
          // Stop triggers game over
          console.log(`[Card ${id}] Stop triggered`);
          onGameOver();
          break;
        case "0":
          // Zero doesn't change cash
          console.log(`[Card ${id}] Zero card`);
          break;
        case "x2":
          // Multiplier doubles current cash
          console.log(`[Card ${id}] x2 multiplier`);
          setCash((prevCash) => prevCash * 2);
          break;
        default:
          // Regular cash cards add their amount
          const amount = parseCardAmount(cardData.amount);
          console.log(`[Card ${id}] Cash card with amount:`, amount);
          setCash((prevCash) => prevCash + amount);

          // Save animation for later
          if (isCashCard) {
            console.log(`[Card ${id}] Setting pending animation:`, {
              id,
              amount,
            });
            setPendingAnimation({ id, amount });
          }
          break;
      }
    }
  };

  // Create sparkles for effect
  const sparkles = Array.from({ length: 8 }, (_, i) => i);

  // Determine the background color based on the card type
  const getBackgroundColor = () => {
    if (imageError) {
      // Fallback colors based on the card name
      switch (cardData.title) {
        case "Bomb":
          return "bg-red-500";
        case "Stop":
          return "bg-gray-500";
        case "Zero":
          return "bg-yellow-500";
        case "Multiplier":
          return "bg-blue-500";
        default:
          return "bg-green-500";
      }
    }
    return "";
  };

  return (
    <motion.li
      ref={cardRef}
      data-card-id={id}
      className="w-[85px] h-[85px] sm:w-[113px] sm:h-[113px] mx-auto rounded-lg flex items-center justify-center border-t border-white/15 cursor-pointer relative overflow-hidden"
      onClick={handleClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        ...cardEffects,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Wave effect */}
      {isFlipped && !gameEnded && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: [0, 1, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}

      {/* Explosion effect when game ends */}
      {gameEnded && isFlipped && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,0,0.4) 0%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}

      {/* Sparkles effect for normal cards */}
      {isFlipped &&
        !gameEnded &&
        sparkles.map((sparkle) => (
          <motion.div
            key={sparkle}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{
              x: "50%",
              y: "50%",
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `${Math.cos((sparkle * 45 * Math.PI) / 180) * 60}px`,
              y: `${Math.sin((sparkle * 45 * Math.PI) / 180) * 60}px`,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: sparkle * 0.1,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Explosion particles when game ends */}
      {gameEnded &&
        isFlipped &&
        sparkles.map((sparkle) => (
          <motion.div
            key={sparkle}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            initial={{
              x: "50%",
              y: "50%",
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `${Math.cos((sparkle * 45 * Math.PI) / 180) * 80}px`,
              y: `${Math.sin((sparkle * 45 * Math.PI) / 180) * 80}px`,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: sparkle * 0.15,
              ease: "easeOut",
            }}
          />
        ))}

      <AnimatePresence mode="wait">
        {!isFlipped ? (
          // Front side
          <motion.div
            key="front"
            className="absolute w-full h-full bg-white/5 backdrop-blur-lg rounded-lg flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="text-white/40 font-extrabold text-lg font-inter"
              animate={{
                rotate: isFlipped ? [0, 10, -10, 0] : 0,
                scale: isFlipped ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              $
            </motion.span>
          </motion.div>
        ) : (
          // Back side
          <motion.div
            key="back"
            className="absolute w-full h-full rounded-lg flex flex-col items-center justify-center overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {/* Background image with zoom effect */}
            <motion.div
              className={`absolute inset-0 w-full h-full ${getBackgroundColor()}`}
              style={{
                backgroundImage:
                  imageLoaded && !imageError ? `url(${cardData.bg})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 rounded-lg" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div
                className={`${
                  cardData.bg.includes("green") ? "scale-[1.25]" : ""
                }`}
              >
                <cardData.icon width={65} height={65} />
              </div>
              {(cardData.title.includes("0") ||
                cardData.title.includes("1M")) && (
                <motion.span
                  className="text-white/90 font-bold text-xs font-inter mt-1 drop-shadow-lg"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {cardData.title}
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multiple Animated Icons */}
      <MultipleAnimatedIcons
        cardId={id}
        isVisible={true}
        cardRef={cardRef}
        targetRef={targetRef}
      />
    </motion.li>
  );
};

export default Card;
