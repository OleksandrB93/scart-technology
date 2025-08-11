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

      // Show modal after 3.5 seconds (longer explosion effect)
      setTimeout(() => {
        setShowExplosion(false);
        setShowModal(true);
      }, 3500);
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
          animate={{
            opacity: 1,
            x: showExplosion ? [0, -5, 5, -3, 3, 0] : 0,
            y: showExplosion ? [0, -3, 3, -2, 2, 0] : 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.3 },
            x: {
              duration: 0.1,
              repeat: showExplosion ? Infinity : 0,
              repeatDelay: 0.1,
            },
            y: {
              duration: 0.1,
              repeat: showExplosion ? Infinity : 0,
              repeatDelay: 0.1,
            },
          }}
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
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Initial Bomb Drop */}
                <motion.div
                  className="text-red-500 text-8xl mb-4 relative"
                  initial={{ y: -300, rotate: 0, scale: 0.3 }}
                  animate={{
                    y: [0, 30, 0],
                    rotate: [0, 1080],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.6, 1],
                  }}
                >
                  💣
                </motion.div>

                {/* Bomb Shadow */}
                <motion.div
                  className="absolute w-16 h-4 bg-black/30 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 0.8],
                    opacity: [0, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.6, 1],
                  }}
                />

                {/* Warning Flash */}
                <motion.div
                  className="absolute inset-0 bg-red-500/40 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 3, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                />

                {/* Multiple Warning Flashes */}
                {Array.from({ length: 2 }).map((_, flashIndex) => (
                  <motion.div
                    key={flashIndex}
                    className="absolute inset-0 bg-orange-500/30 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 2.5, 0],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + flashIndex * 0.2,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Multiple Explosion Waves */}
                {Array.from({ length: 3 }).map((_, waveIndex) => (
                  <motion.div
                    key={waveIndex}
                    className="absolute inset-0 border-4 border-red-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 3],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + waveIndex * 0.2,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Explosion Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x:
                        Math.cos((i * 18 * Math.PI) / 180) *
                        (150 + Math.random() * 100),
                      y:
                        Math.sin((i * 18 * Math.PI) / 180) *
                        (150 + Math.random() * 100),
                      scale: [0, 1.5, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: 0.8 + Math.random() * 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Fire Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={`fire-${i}`}
                    className="absolute w-2 h-2 bg-orange-500 rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x:
                        Math.cos((i * 24 * Math.PI) / 180) *
                        (100 + Math.random() * 80),
                      y:
                        Math.sin((i * 24 * Math.PI) / 180) *
                        (100 + Math.random() * 80),
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 1 + Math.random() * 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Shockwave Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 4],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.2,
                    ease: "easeOut",
                  }}
                />
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
