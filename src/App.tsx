import { Routes, Route } from "react-router-dom";
import GamePage from "@/pages/GamePage";
import DebugPage from "@/pages/DebugPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
      <Route path="/debug" element={<DebugPage />} />
    </Routes>
  );
}
