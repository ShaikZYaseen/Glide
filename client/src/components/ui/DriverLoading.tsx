import React, { useState, useEffect, useRef } from "react";
import LocationMap from "./LocationMap";
import PlaceIcon from "@mui/icons-material/Place";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { gsap } from "gsap";
import toast, { Toaster } from "react-hot-toast";

interface propType {
  setConfirmDriver: React.Dispatch<React.SetStateAction<boolean>>;
  setDriverLoading: React.Dispatch<React.SetStateAction<boolean>>;
  driverLoading: boolean;
  ride: any;
}

const DriverLoading = ({
  setDriverLoading,
  setConfirmDriver,
  driverLoading,
  ride,
}: propType) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded); // Toggle the state
  };

  useEffect(() => {
    if (containerRef.current) {
      if (isExpanded) {
        gsap.to(containerRef.current, {
          duration: 0.5,
          height: "510px",
          opacity: 1,
          ease: "power2.out",
        });
      } else {
        gsap.to(containerRef.current, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          ease: "power2.inOut",
        });
      }
    }
  }, [isExpanded]);

  useEffect(() => {
    if (driverLoading) {
      if (!toast.loading("Looking for drivers", { id: "loading-toast" })) {
        toast.loading("Looking for drivers", { id: "loading-toast" });
      }
    }
  }, [driverLoading]);

  return (
    <div className="w-full bg-black h-screen relative overflow-hidden">
      <Toaster />
      <span className="w-full h-full">
        <LocationMap />
      </span>

      <div
        onClick={toggleVisibility}
        style={{ zIndex: 1000 }}
        className="absolute bottom-0 w-full flex justify-center items-center z-50 cursor-pointer bg-black text-white py-2"
      >
        <p className="text-white text-xl p-2 mr-2 font-bold">
          Looking for drivers
        </p>
        {isExpanded ? (
          <ExpandLess fontSize="large" className="text-white" />
        ) : (
          <ExpandMore fontSize="large" className="text-white" />
        )}
      </div>

      <div
        ref={containerRef}
        className="absolute bottom-0  w-full flex flex-col bg-black items-center justify-center z-50 cursor-pointer  h-full text-white px-10 overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="w-full h-full flex flex-col bg-black justify-center items-center">
          <img
            className="h-[140px] w-[140px] object-contain"
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLebVsz1pNjN88Pq7SmusZvBl9BCurZan79fKrkaV_m8tIw4yS"
            alt="car"
          />
          <p className="text-black h-[60px] bg-white flex  mt-3 border border-white w-1/3 p-2 rounded-md items-center justify-center ">
            <div className="p-2">
              <PlaceIcon />
            </div>
            <div className="flex flex-col">
              <span>{ride.pickup}</span>
            </div>
          </p>

          <p className="text-black h-[60px] bg-white flex mt-3 border border-white w-1/3 p-2 rounded-md items-center justify-center ">
            <div className="p-2">
              <PlaceIcon />
            </div>
            <div className="flex flex-col">
              <span>{ride.destination}</span>
            </div>
          </p>

          <p className="text-black h-[60px] bg-white flex mt-3  border border-white w-1/3 p-2 pr-[70px] rounded-md items-center justify-center ">
            <div className="p-1 text-[20px]">
              <CurrencyRupeeIcon className="w-full h-full" />
            </div>
            <div className="flex flex-col   ">
              <span>{ride.fare.toLocaleString("en-IN")}/-</span>
              <span>cash cash</span>
            </div>
          </p>

          <p className="h-[2px] flex items-center bg-black pr-[200px] justify-center mb-10"></p>
        </div>
      </div>
    </div>
  );
};

export default DriverLoading;
