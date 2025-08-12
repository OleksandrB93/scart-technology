import React, {
  createContext,
  useContext,
  useState,
  useCallback,
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
  isReady: boolean;
  setReady: (ready: boolean) => void;
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
  const [isReady, setIsReady] = useState(false);

  const setReady = useCallback((ready: boolean) => {
    setIsReady(ready);
  }, []);

  const startIconAnimation = useCallback(
    (
      cardId: number,
      _cardRect: DOMRect,
      _targetRect: DOMRect,
      amount: number
    ) => {
      // Перевіряємо чи готові всі елементи
      if (!isReady) {
        // Якщо не готові, чекаємо трохи і спробуємо знову
        setTimeout(() => {
          if (isReady) {
            startIconAnimation(cardId, _cardRect, _targetRect, amount);
          }
        }, 100);
        return;
      }

      // Додаємо невелику затримку для стабільної роботи на деплої
      setTimeout(() => {
        setIsAnimating(true);
        setAnimatedCardId(cardId);
        setAnimationAmount(amount);

        // Stop animation after 2.5 seconds (довше для стабільності)
        setTimeout(() => {
          setIsAnimating(false);
          setAnimatedCardId(null);
          setAnimationAmount(0);
        }, 2500);
      }, 50);
    },
    [isReady]
  );

  const stopIconAnimation = useCallback(() => {
    setIsAnimating(false);
    setAnimatedCardId(null);
    setAnimationAmount(0);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        isAnimating,
        startIconAnimation,
        stopIconAnimation,
        animatedCardId,
        animationAmount,
        isReady,
        setReady,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
