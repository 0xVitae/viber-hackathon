import { TherapyChat } from "./components/TherapyChat";
import { VideoAdPopup } from "./components/VideoAdPopup";

function App() {
  return (
    <>
      <VideoAdPopup src="/ads/temu-therapist-ad.mp4" />
      <TherapyChat onBack={() => window.location.reload()} />
    </>
  );
}

export default App;
