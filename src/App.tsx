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
import { AnimationProvider } from "./contexts/AnimationContext";

function App() {
  const [cash, setCash] = useState(0);
  const [isBombModalOpen, setIsBombModalOpen] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
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
          gameEnded={gameEnded}
          onRestartGame={handleRestartGame}
          targetRef={cashIconRef}
        />
        <InfoIconsList />
        <Button />
        <MainPanel />
        <BombModal
          isOpen={isBombModalOpen}
          onClose={handleCloseBombModal}
          onRestartGame={handleRestartGame}
          cash={cash}
        />
      </MainWrapper>
    </AnimationProvider>
  );
}

export default App;
