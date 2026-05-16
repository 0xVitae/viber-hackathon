import { TherapyChat } from "./components/TherapyChat";

function App() {
  return <TherapyChat onBack={() => window.location.reload()} />;
}

export default App;
