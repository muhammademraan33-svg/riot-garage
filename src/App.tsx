import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { KitsAndBundles } from "./pages/KitsAndBundles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kits-and-bundles" element={<KitsAndBundles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
