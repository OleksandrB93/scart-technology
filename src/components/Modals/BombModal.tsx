import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { BombIcon, CashIcon } from "../icons";
import { formatCash } from "../../utils/utils";
import Button from "../Button";
import DefuseIcon from "../icons/DefuseIcon";

interface BombModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestartGame: () => void;
  totalCash: number;
}

const BombModal = ({
  isOpen,
  onClose,
  onRestartGame,
  totalCash,
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
            className="absolute inset-0 -z-10 backdrop-blur-md"
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
                className="absolute inset-0 -z-10 bg-[#181A20]/80 text-centershadow-2xl overflow-y-auto "
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.button
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <IoMdClose className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                </motion.button>
                <h2
                  className="text-center text-2xl sm:text-3xl font-bold text-white font-inter mt-[170px]"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(255,255,255,0.7), 0 0px 1px #000",
                  }}
                >
                  Game over!
                </h2>
                <p className="text-center text-white/90 text-[14px] leading-3">
                  You've reached <br /> the end of this run...
                </p>
                <motion.div
                  className="relative h-[200px] flex justify-center items-center text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 
              after:bg-contain after:blur-[1px] after:scale-40 after:absolute after:inset-0 after:bg-[url('/imgs/bomb.png')] after:bg-no-repeat after:bg-center  after:opacity-30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* <BombIcon width={72} height={72} className="relative z-10" /> */}
                  <img src="/imgs/bombIcon.png" alt="bomb" className="w-15 h-15 object-contain" />
                </motion.div>
                <div className="rounded-lg p-4 mb- flex flex-col items-center justify-center">
                  {/* <CashIcon /> */}
                  <img src="/imgs/cash.png" alt="cash" className="w-15 h-15 object-contain" />
                  <p className="text-base font-bold">{formatCash(totalCash)}</p>
                </div>

                <p className="text-center text-[14px] sm:text-[16px] text-white/80 leading-3 mb-4">
                  ...or defuse it and save your run!
                </p>

                <div className="flex justify-center items-center gap-2 px-4">
                  <Button
                    background="linear-gradient(to bottom, #FF5858 0%, #993535 100%)"
                    text="Take a hit"
                    onClick={handleLoseResources}
                    icon={<BombIcon width={40} height={40} />}
                    iconSide="left"
                  />
                  <Button
                    background="linear-gradient(to bottom, #AD69FF 0%, #6723CD 100%)"
                    text="Defuse for "
                    onClick={handleRestartGame}
                    icon={<DefuseIcon width={"40"} height={"40"} />}
                    iconSide="right"
                    btnValue={49}
                  />
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
