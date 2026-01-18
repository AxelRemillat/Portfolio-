import "./styles/index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Parcours from "./pages/Parcours";
import VousEtMoiPage from "./pages/vous-et-moi/VousEtMoiPage";
import ContactPage from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/vous-et-moi" element={<VousEtMoiPage />} />
          <Route path="/about" element={<Navigate to="/vous-et-moi" replace />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
