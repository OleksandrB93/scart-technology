import { useState, useRef } from "react";

import MainWrapper from "./components/Providers/MainWrapper";
import Logo from "./components/icons/LogoIcon";
import Title from "./components/Title";
import CashDisplay from "./components/CashDisplay";
import CardList from "./components/CardList";
import InfoIconsList from "./components/InfoIconsList";
import Button from "./components/Button";
import MainPanel from "./components/MainPanel";
import BombModal from "./components/BombModal";
import ClaimModal from "./components/ClaimModal";
import GameOverModal from "./components/GameOverModal";
import { AnimationProvider } from "./contexts/AnimationContext";

function App() {
  const [cash, setCash] = useState(0);
  const [isBombModalOpen, setIsBombModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [flippedCards, setFlippedCards] = useState<
    Array<{ id: number; cardData: any }>
  >([]);
  const cashIconRef = useRef<HTMLDivElement>(null);

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
    <AnimationProvider>
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
    </AnimationProvider>
  );
}

export default App;
