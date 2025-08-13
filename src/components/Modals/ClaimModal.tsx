import { motion, AnimatePresence } from "framer-motion";
import { randomCardList } from "../../configs/random-card";
import { formatCash } from "../../utils/utils";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  flippedCards: Array<{ id: number; cardData: (typeof randomCardList)[0] }>;
  totalCash: number;
}

const ClaimModal = ({
  isOpen,
  onClose,
  flippedCards,
  totalCash,
}: ClaimModalProps) => {
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
            className="absolute inset-0 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-4 sm:p-6 md:p-8 w-[95%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-4 text-center border-2 border-green-400 shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
            {/* Success Icon */}
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🎉
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Congratulations!
            </h2>

            <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg leading-9">
              You have successfully opened all cards!
            </p>

            {/* Total Cash Display */}
            <div className="bg-green-800/50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <p className="text-white/80 text-xs sm:text-sm mb-2">
                Total winnings:
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-300">
                {formatCash(totalCash)}
              </p>
            </div>

            {/* Opened Cards Grid */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Opened cards:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-h-48 sm:max-h-64 overflow-y-auto">
                {flippedCards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 rounded-lg p-2 sm:p-3 flex flex-col items-center"
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
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <motion.button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                🎮 Play again
              </motion.button>

              <motion.button
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                💰 Save winnings
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClaimModal;
