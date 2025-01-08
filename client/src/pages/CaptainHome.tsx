import LocationMap from "../components/ui/LocationMap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ME from "../assets/ME.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";
import { captainLogout, getLoggedCaptainUser } from "../services/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RidePopup from "../components/ui/RidePopup";
import ConfirmRidepopup from "../components/ui/ConifrmRidepopup";
import { useCaptainSignup } from "../context/CaptainSignupContext";

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const CaptainHome = () => {
  const [captainDashboard, setCaptainDashboard] = useState(false);
  const [ridePopup, setRidePopup] = useState(true);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const { signupData } = useCaptainSignup();
  const { sendMessage, receiveMessage } = useContext(SocketContext) || {};

  useEffect(() => {
    const getUser = async () => {
      let { success, user } = await getLoggedCaptainUser();
      return user;
    };

    const fetchUser = async () => {
      try {
        const user = getUser();
        if (success && sendMessage && user) {
          sendMessage("join", { userType: "captain", userId: user?._id });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    const updateLocation = () => {
      const user = getUser();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: user._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    fetchUser();
  }, [sendMessage]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await captainLogout();
    if (response.success) {
      localStorage.removeItem("token");
      toast.success(response.message);
      navigate("/captain-login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full bg-black h-screen relative">
      <Toaster />

      {captainDashboard && (
        <div className="w-full h-screen relative">
          <span
            onClick={() => handleLogout()}
            className="absolute top-4 right-4 text-black font-extrabold p-1 hover:text-gray-500 z-50 cursor-pointer"
          >
            <LogoutIcon />
          </span>
          <span className="w-full h-full">
            <LocationMap />
          </span>
          <div className="absolute bottom-0 w-full h-[259px]] flex flex-col items-center justify-center bg-black">
            <div className="flex justify-center items-center">
              <span className="h-[60px] w-[60px] rounded-[50%]">
                <img
                  className="h-[60px] w-[60px]  rounded-[50%] object-contain"
                  src={ME}
                  alt="car"
                />
              </span>

              <div className="flex flex-col ml-[40px] p-5 text-white">
                <span className=" text-[25px] font-bold">Shaik Yaseen</span>
                <span className="text-[14px] font-bold">₹ 295</span>
                <span className="font-extrabold">Earned</span>
              </div>
            </div>

            <div className="flex items-center justify-center p-2">
              <div className=" flex flex-col items-center justify-center mr-2 p-2 bg-gray-600 rounded-md">
                <span className="text-white">
                  <AccessTimeIcon />
                </span>
                <p className="text-white text-[12px]">10.2</p>
                <p className="text-white text-[12px]">Hours Online</p>
              </div>
              <div className=" flex flex-col mr-2 items-center justify-center p-2 bg-gray-600 rounded-md">
                <span className="text-white">
                  <AccessTimeIcon />
                </span>
                <p className="text-white text-[12px]">10.2</p>
                <p className="text-white text-[12px]">Hours Online</p>
              </div>
              <div className=" flex flex-col items-center justify-center p-2 bg-gray-600 rounded-md">
                <span className="text-white">
                  <AccessTimeIcon />
                </span>
                <p className="text-white text-[12px]">10.2</p>
                <p className="text-white text-[12px]">Hours Online</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {ridePopup && (
        <div>
          <RidePopup
            setCaptainDashboard={setCaptainDashboard}
            setRidePopup={setRidePopup}
            setConfirmRidePopup={setConfirmRidePopup}
          />
        </div>
      )}

      {confirmRidePopup && (
        <div className="h-screen">
          <ConfirmRidepopup
            setConfirmRidePopup={setConfirmRidePopup}
            setRidePopup={setRidePopup}
          />
        </div>
      )}
    </div>
  );
};

export default CaptainHome;
