import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { randomCardList } from "../configs/random-card";

interface CardListProps {
  setCash: (cash: number | ((prevCash: number) => number)) => void;
  onBombTrigger: () => void;
  gameEnded: boolean;
  onRestartGame?: () => void;
}

const CardList = ({ setCash, onBombTrigger, gameEnded }: CardListProps) => {
  const [cards, setCards] = useState<Array<(typeof randomCardList)[0]>>([]);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Random distribution of cards when initializing
  useEffect(() => {
    const shuffledCards = [...randomCardList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);

    setCards(shuffledCards);
  }, []);

  // Open all cards when game ends
  useEffect(() => {
    if (gameEnded) {
      const allCardIndexes = Array.from({ length: 9 }, (_, i) => i);
      setFlippedCards(new Set(allCardIndexes));
    } else {
      // Reset cards when game restarts
      setFlippedCards(new Set());
      const shuffledCards = [...randomCardList]
        .sort(() => Math.random() - 0.5)
        .slice(0, 9);
      setCards(shuffledCards);
    }
  }, [gameEnded]);

  const handleCardFlip = (id: number) => {
    setFlippedCards((prev) => new Set([...prev, id]));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateY: 180,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.ul
      className="w-[278px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] 2xl:w-[680px] mx-auto mb-8 grid grid-cols-3 gap-x-2 gap-y-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((cardData, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <Card
            id={index}
            cardData={cardData}
            isFlipped={flippedCards.has(index)}
            onFlip={handleCardFlip}
            setCash={setCash}
            onBombTrigger={onBombTrigger}
            gameEnded={gameEnded}
          />
        </motion.div>
      ))}
    </motion.ul>
  );
};

export default CardList;
