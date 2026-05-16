import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "./components/LandingPage";
import { TherapyChat } from "./components/TherapyChat";

type Screen = "landing" | "chat";

function App() {
  const [screen, setScreen] = useState<Screen>("landing");

  return (
    <AnimatePresence mode="wait">
      {screen === "landing" ? (
        <LandingPage key="landing" onStart={() => setScreen("chat")} />
      ) : (
        <TherapyChat key="chat" onBack={() => setScreen("landing")} />
      )}
    </AnimatePresence>
  );
}

export default App;
