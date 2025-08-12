import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AnimationContextType {
  isAnimating: boolean;
  startIconAnimation: (
    cardId: number,
    cardRect: DOMRect,
    targetRect: DOMRect,
    amount: number
  ) => void;
  stopIconAnimation: () => void;
  animatedCardId: number | null;
  animationAmount: number;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedCardId, setAnimatedCardId] = useState<number | null>(null);
  const [animationAmount, setAnimationAmount] = useState(0);

  const startIconAnimation = (
    cardId: number,
    _cardRect: DOMRect,
    _targetRect: DOMRect,
    amount: number
  ) => {
    setIsAnimating(true);
    setAnimatedCardId(cardId);
    setAnimationAmount(amount);

    // Stop animation after 2 seconds (longer for multiple icons)
    setTimeout(() => {
      setIsAnimating(false);
      setAnimatedCardId(null);
      setAnimationAmount(0);
    }, 2000);
  };

  const stopIconAnimation = () => {
    setIsAnimating(false);
    setAnimatedCardId(null);
    setAnimationAmount(0);
  };

  return (
    <AnimationContext.Provider
      value={{
        isAnimating,
        startIconAnimation,
        stopIconAnimation,
        animatedCardId,
        animationAmount,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
