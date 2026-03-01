import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AudioProvider from "../audio/AudioProvider";

export default function Layout() {
  return (
    <AudioProvider src="/audio/quietphase-ambient-zen-489706.mp3">
      <div className="page">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </AudioProvider>
  );
}
