import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { formatCash } from "../../utils/utils";
import Button from "../Button";

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCash: number;
}

const GameOverModal = ({ isOpen, onClose, totalCash }: GameOverModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center h-screen top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 -z-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
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
                textShadow: "0 2px 8px rgba(255,255,255,0.7), 0 0px 1px #000",
              }}
            >
              Game over!
            </h2>
            <p className="text-center text-white/90 text-[14px] leading-3">
              You've reached <br /> the end of this run...
            </p>
            <motion.div
              className="relative h-[200px] flex justify-center items-center text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 
              after:bg-contain after:blur-[1px] after:scale-40 after:absolute after:inset-0 after:bg-[url('/imgs/stop.png')] after:bg-no-repeat after:bg-center  after:opacity-30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* <StopIcon width={72} height={72} className="relative z-10" /> */}
              <img
                src="/imgs/stopIcon.png"
                alt="stop"
                className="w-15 h-15 object-contain"
              />
            </motion.div>

            <div className="rounded-lg p-4 mb- flex flex-col items-center justify-center">
              {/* <CashIcon /> */}
              <img
                src="/imgs/cash.png"
                alt="cash"
                className="w-15 h-15 object-contain"
              />
              <p className="text-base font-bold">{formatCash(totalCash)}</p>
            </div>

            {/* Opened Cards Grid
            <div className="mb-6 sm:mb-8 px-4">
              <h3 className="text-sm sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Opened cards:
              </h3>
              <div className="flex overflow-x-auto space-x-2 sm:space-x-4 py-2 max-w-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {flippedCards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 rounded-lg p-2 sm:p-3 flex flex-col items-center min-w-[64px] sm:min-w-[80px] md:min-w-[96px] flex-shrink-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1 sm:mb-2 flex items-center justify-center">
                      <card.cardData.icon width={32} height={32} />
                    </div>
                    {card.cardData.amount && (
                      <span className="text-green-300 text-xs font-bold">
                        {card.cardData.amount}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div> */}

            <p className="text-center text-[14px] sm:text-[16px] text-white/80 leading-3 mb-4">
              ...claim and return to the main board
            </p>
            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3 flex justify-center items-center">
              <Button text="Claim" onClick={onClose} width={"194px"} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal;
