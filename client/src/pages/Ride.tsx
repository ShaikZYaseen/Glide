import React, { useState, useEffect, useRef } from "react";
import LocationMap from "../components/ui/LocationMap";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import BoyIcon from "@mui/icons-material/Boy";
import { gsap } from "gsap";
import { getAllFare } from "../services/ride";

interface propType {
  setConfirmRide: React.Dispatch<React.SetStateAction<boolean>>;
  setRideType: React.Dispatch<React.SetStateAction<boolean>>;
  setVehicleType: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  destination: string;
}

interface Fare {
  fare: number;
  vehicleType: string;
}

const Ride = ({
  setConfirmRide,
  setRideType,
  setVehicleType,
  location,
  destination,
}: propType) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [fares, setFares] = useState<Fare[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
  };

  const getFares = async () => {
    const data = await getAllFare(location, destination);
    setFares(data.fares);
  };

  useEffect(() => {
    getFares();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          duration: 0.5,
          height: "auto",
          opacity: 1,
        });
      } else {
        gsap.to(contentRef.current, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          ease: "power2.inOut",
        });
      }
    }
  }, [isExpanded]);

  return (
    <div className="w-full h-screen bg-white justify-center items-center flex flex-col relative">
      <span onClick={() => setIsExpanded(false)} className="w-full h-full">
        <LocationMap />
      </span>

      <div
        className="absolute bottom-0 w-full flex justify-center items-center z-50 cursor-pointer bg-black text-white py-2"
        onClick={toggleVisibility}
        style={{ zIndex: 1000 }}
      >
        <h1 className="text-white font-bold p-3">Choose a ride</h1>

        {isExpanded ? (
          <ExpandLess
            fontSize="large"
            className="text-white text-3xl font-bold"
          />
        ) : (
          <ExpandMore
            fontSize="large"
            className="text-white text-3xl font-bold"
          />
        )}
      </div>

      <div
        ref={contentRef}
        className="h-0 w-full absolute p-5 bottom-0 px-[400px] bg-black text-black font-bold z-50 transition-all duration-500 ease-in-out overflow-hidden"
      >
        {fares.map((fare, index) => (
          <div
            key={index}
            onClick={() => {
              setRideType(false);
              setConfirmRide(true);
            }}
            className="h-[100px] bg-white flex border rounded-md border-black shadow-xl items-center justify-around cursor-pointer"
          >
            {index === 1 && (
              <img
                className="h-[120px] w-[120px] object-contain"
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLebVsz1pNjN88Pq7SmusZvBl9BCurZan79fKrkaV_m8tIw4yS"
                alt="car"
              />
            )}
            {index === 0 && (
              <img
                className="h-[120px] w-[120px] object-contain p-2"
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJCNvVYbc3V-GMD1a5OZNTqWkkshNVTRjMX9Jt0YNqTMpCk9vf"
                alt="auto"
              />
            )}
            {index === 2 && (
              <img
                className="h-[80px] w-[80px] object-contain p-2"
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR1AXMofWHBvX9lOj7GEOOlljfQv1MIIIvchxDbeEtAozNlNipl"
                alt="bike"
              />
            )}

            <span className="flex flex-col items-center justify-center">
              <span className="flex items-center justify-center">
                {fare.vehicleType}
                <span className="flex items-center justify-center">
                  <BoyIcon />4
                </span>
              </span>
              <span className="text-[9px]">2mins away, 7:30pm</span>
              <span className="text-[10px]">Affordable, compact rides</span>
            </span>
            <span className="p-3">
              ₹ {fare.fare.toLocaleString("en-IN")} /-
            </span>
          </div>
        ))}

        <p className="h-[2px] flex items-center bg-black pr-[200px] justify-center mb-10"></p>
      </div>
    </div>
  );
};

export default Ride;
