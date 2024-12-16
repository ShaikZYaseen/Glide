import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import { AppProviders } from "./context/AppProviders";

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </AppProviders>
  );
}

export default App;
