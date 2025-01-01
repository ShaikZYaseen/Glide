import { useState, useEffect, useRef } from "react";
import LocationMap from "../components/ui/LocationMap";

import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { gsap } from "gsap";

const CaptainRiding = () => {
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
          height: "100px",
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

  return (
    <div className="w-full bg-black h-screen  relative overflow-hidden">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div
        onClick={toggleVisibility}
        style={{ zIndex: 1000 }}
        className="absolute bottom-0 w-full h-auto flex justify-center items-center z-50 cursor-pointer bg-black text-white"
      >
        <div
          ref={containerRef}
          className="absolute bottom-0 h-auto  w-full flex  bg-black items-center justify-center z-50 cursor-pointer  text-white px-10 overflow-hidden transition-all duration-500 ease-in-out"
        >
          <p className="mr-10 font-bold text-[20px]">4 KM away</p>
          <button
            // onClick={() => {
            //   navigate("/captain-riding");
            // }}
            className="bg-green-500 w-[140px] p-2 mr-10  rounded-md text-white font-bold"
          >
            Complete ride
          </button>
        </div>
        <p className="text-white text--[8px] z-1000000 p-3 mr-2 font-bold">
          Riding
        </p>
        {isExpanded ? (
          <ExpandLess fontSize="small" className="text-white" />
        ) : (
          <ExpandMore fontSize="small" className="text-white" />
        )}
      </div>
    </div>
  );
};

export default CaptainRiding;