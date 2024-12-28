import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";
import ProtectedRoute from "./utils/Protected";

// Lazy load components
const Hero = lazy(() => import("./pages/Hero"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Upload = lazy(() => import("./pages/Upload"));
const CaptainLogin = lazy(() => import("./pages/CaptainLogin"));
const CaptainSignup = lazy(() => import("./pages/CaptainSignup"));
const CaptainUpload = lazy(() => import("./pages/CaptainUpload"));
const Home = lazy(() => import("./pages/Home"));
const CaptainHome = lazy(() => import("./pages/CaptainHome"));

function App() {
  return (
    <AppProviders>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
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
          />
          <Route
            path="/captain-dashboard"
            element={
              <ProtectedRoute>
                <CaptainHome />
              </ProtectedRoute>
            }
          />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
