import { useState, useRef, useEffect } from "react";
import { useAnimation } from "../contexts/AnimationContext";
import MainWrapper from "./Providers/MainWrapper";
import Logo from "./icons/LogoIcon";
import Title from "./Title";
import CashDisplay from "./CashDisplay";
import CardList from "./CardList";
import InfoIconsList from "./InfoIconsList";
import Button from "./Button";
import MainPanel from "./MainPanel";
import BombModal from "./BombModal";
import ClaimModal from "./ClaimModal";
import GameOverModal from "./GameOverModal";

function AppContent() {
  const [cash, setCash] = useState(0);
  const [isBombModalOpen, setIsBombModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [flippedCards, setFlippedCards] = useState<
    Array<{ id: number; cardData: any }>
  >([]);
  const cashIconRef = useRef<HTMLDivElement>(null);
  const { setReady } = useAnimation();

  // Глобальна перевірка готовності після завантаження
  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 500); // Затримка для стабільної роботи на деплої

    return () => clearTimeout(timer);
  }, [setReady]);

  const handleBombTrigger = () => {
    setIsBombModalOpen(true);
    setGameEnded(true);
  };

  const handleCloseBombModal = () => {
    setIsBombModalOpen(false);
  };

  const handleRestartGame = () => {
    setCash(0);
    setGameEnded(false);
    setIsBombModalOpen(false);
    setIsClaimModalOpen(false);
    setIsGameOverModalOpen(false);
    setFlippedCards([]);
  };

  const handleClaimClick = () => {
    setIsClaimModalOpen(true);
  };

  const handleCloseClaimModal = () => {
    setIsClaimModalOpen(false);
  };

  const handleGameOver = () => {
    setIsGameOverModalOpen(true);
    setGameEnded(true);
  };

  const handleCloseGameOverModal = () => {
    setIsGameOverModalOpen(false);
  };

  return (
    <MainWrapper>
      <Logo />
      <Title />
      <CashDisplay cash={cash} cashIconRef={cashIconRef} />
      <CardList
        setCash={setCash}
        onBombTrigger={handleBombTrigger}
        onGameOver={handleGameOver}
        gameEnded={gameEnded}
        targetRef={cashIconRef}
        onFlippedCardsChange={setFlippedCards}
      />
      <InfoIconsList />
      <Button
        onClick={handleClaimClick}
        text="Claim"
        disabled={flippedCards.length === 0}
      />
      <MainPanel />

      {/* modals */}
      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={handleCloseClaimModal}
        flippedCards={flippedCards}
        totalCash={cash}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        onClose={handleCloseGameOverModal}
        totalCash={cash}
      />
      <BombModal
        isOpen={isBombModalOpen}
        onClose={handleCloseBombModal}
        onRestartGame={handleRestartGame}
        totalCash={cash}
      />
    </MainWrapper>
  );
}

export default AppContent;
