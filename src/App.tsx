import { AnimationProvider } from "./contexts/AnimationContext";
import AppContent from "./components/AppContent";

function App() {
  return (
    <AnimationProvider>
      <AppContent />
    </AnimationProvider>
  );
}

export default App;
