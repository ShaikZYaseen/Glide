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
import ProtectedRoute from "./utils/Protected";
import Ride from "./pages/Ride";
import RideConfirm from "./pages/RideConfirm";
import ConfirmDriver from "./pages/ConfirmDriver";

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/ride"
          element={
            <ProtectedRoute>
              <Ride />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/confirm-ride"
          element={
            <ProtectedRoute>
              <RideConfirm />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/confirm-driver"
          element={
            <ProtectedRoute>
              <ConfirmDriver />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="/upload" element={<Upload />} />
      </Routes>
    </AppProviders>
  );
}

export default App;
