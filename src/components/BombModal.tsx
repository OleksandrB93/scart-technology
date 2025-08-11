import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BombModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestartGame: () => void;
  cash: number;
}

const BombModal = ({
  isOpen,
  onClose,
  onRestartGame,
  cash,
}: BombModalProps) => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Show explosion effect
      setShowExplosion(true);

      // Show modal after 2 seconds
      setTimeout(() => {
        setShowExplosion(false);
        setShowModal(true);
      }, 2000);
    } else {
      setShowExplosion(false);
      setShowModal(false);
    }
  }, [isOpen]);

  const handleSaveResources = () => {
    setShowModal(false);
    onClose();
  };

  const handleLoseResources = () => {
    setShowModal(false);
    onClose();
  };

  const handleRestartGame = () => {
    onRestartGame();
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Explosion Effect */}
          <AnimatePresence>
            {showExplosion && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                {/* Bomb Icon */}
                <motion.div
                  className="text-red-500 text-8xl mb-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  💣
                </motion.div>

                {/* Explosion Particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.cos((i * 30 * Math.PI) / 180) * 200,
                      y: Math.sin((i * 30 * Math.PI) / 180) * 200,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Content */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                className="relative bg-gradient-to-br from-red-900 to-red-700 rounded-2xl p-8 max-w-md mx-4 text-center border-2 border-red-400 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Bomb Icon in Modal */}
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💥
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">BOMB!</h2>

                <p className="text-white/90 mb-6">
                  You have hit a bomb! All your resources have burned.
                </p>

                <div className="bg-red-800/50 rounded-lg p-4 mb-6">
                  <p className="text-white/80 text-sm mb-2">Lost resources:</p>
                  <p className="text-2xl font-bold text-red-300">
                    {cash.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.button
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    onClick={handleLoseResources}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ❌ Lose all
                  </motion.button>

                  <motion.button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    onClick={handleRestartGame}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🔄 New game
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BombModal;
