import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Hero />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
