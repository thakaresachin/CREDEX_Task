import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Result from "./pages/Result";
import ShareReport from "./pages/ShareReport";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import PricingData from "./pages/PricingData";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/result" element={<Result />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/pricing-data"
          element={<PricingData />}
        />

        <Route
          path="/share/:shareId"
          element={<ShareReport />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;