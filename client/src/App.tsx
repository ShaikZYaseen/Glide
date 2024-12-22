import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import { AppProviders } from "./context/AppProviders";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainUpload from "./pages/CaptainUpload";
import Home from "./pages/Home";

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-upload" element={<CaptainUpload />} />
        <Route path="/dashboard" element={<Home />} />

        <Route path="/upload" element={<Upload />} />
      </Routes>
    </AppProviders>
  );
}

export default App;
