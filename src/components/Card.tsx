import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { randomCardList } from "../configs/random-card";

interface CardProps {
  id: number;
  cardData: (typeof randomCardList)[0];
  isFlipped: boolean;
  onFlip: (id: number) => void;
  setCash: (cash: number | ((prevCash: number) => number)) => void;
  onBombTrigger: () => void;
  gameEnded: boolean;
}

const Card = ({
  id,
  cardData,
  isFlipped,
  onFlip,
  setCash,
  onBombTrigger,
  gameEnded,
}: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Need to check if the image is loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = cardData.bg;
  }, [cardData.bg]);

  const handleClick = () => {
    if (!isFlipped && !gameEnded) {
      onFlip(id);

      // Handle different card types
      switch (cardData.title) {
        case "Bomb":
          // Bomb triggers game end
          onBombTrigger();
          break;
        case "Stop":
          // Stop doesn't change cash
          break;
        case "Zero":
          // Zero doesn't change cash
          break;
        case "Multiplier":
          // Multiplier doubles current cash
          setCash((prevCash) => prevCash * 2);
          break;
        default:
          // Regular cash cards add their amount
          const amount = Number(
            cardData.amount.replace(/[KMB]/g, (match) => {
              switch (match) {
                case "K":
                  return "000";
                case "M":
                  return "000000";
                case "B":
                  return "000000000";
                default:
                  return "";
              }
            })
          );
          setCash((prevCash) => prevCash + amount);
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
      className="w-[85px] h-[85px] sm:w-[113px] sm:h-[113px] mx-auto rounded-lg flex items-center justify-center border-t border-white/15 cursor-pointer relative overflow-hidden"
      onClick={handleClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      // animate={{
      //   boxShadow: isFlipped
      //     ? "0 0 4px rgba(255, 215, 0, 0.6), 0 2px 5px rgba(0,0,0,0.3)"
      //     : "0 2px 5px rgba(0,0,0,0.3)",
      // }}
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
              {cardData.amount && (
                <motion.span
                  className="text-white font-extrabold text-lg font-inter drop-shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                >
                  {cardData.amount}
                </motion.span>
              )}
              <motion.span
                className="text-white/90 font-medium text-xs font-inter mt-1 drop-shadow-lg"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Card;
