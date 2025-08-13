import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface AnimationContextType {
  isAnimating: boolean;
  animatedCardId: number | null;
  animationAmount: number;
  startIconAnimation: (cardId: number, amount: number) => void;
  stopIconAnimation: () => void;
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

  const startIconAnimation = useCallback((cardId: number, amount: number) => {
    // Run animation immediately
    setIsAnimating(true);
    setAnimatedCardId(cardId);
    setAnimationAmount(amount);
  }, []);

  const stopIconAnimation = useCallback(() => {
    setIsAnimating(false);
    setAnimatedCardId(null);
    setAnimationAmount(0);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        isAnimating,
        animatedCardId,
        animationAmount,
        startIconAnimation,
        stopIconAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
