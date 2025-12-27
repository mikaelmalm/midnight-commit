import { Routes, Route, Link } from "react-router-dom";
import DebugPage from "@/pages/DebugPage";

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground relative">
      <h1 className="text-4xl font-bold tracking-tight">Consultancy Tycoon</h1>
      <p className="mt-4 text-muted-foreground">System Initialized.</p>

      <div className="absolute top-4 right-4 text-xs">
        <Link to="/debug" className="text-gray-500 hover:text-gray-300">
          debug
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debug" element={<DebugPage />} />
    </Routes>
  );
}
