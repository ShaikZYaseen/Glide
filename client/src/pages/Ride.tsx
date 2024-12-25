import React, { useRef, useState } from "react";
import LocationMap from "../components/ui/LocationMap";
import BoyIcon from "@mui/icons-material/Boy";
import { gsap } from "gsap";

const Ride = () => {
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const dragHandlerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0); // Track initial touch position
  const [currentY, setCurrentY] = useState(0); // Track current touch position

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY;

    // Update current Y position dynamically
    setCurrentY(deltaY);

    // Move the div up or down using GSAP
    gsap.to(bottomDivRef.current, {
      y: deltaY,
      duration: 0,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Decide final position (snap up or down)
    if (currentY < -100) {
      // Snap to fully open
      gsap.to(bottomDivRef.current, {
        y: -window.innerHeight + 200, // Fully expanded height
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      // Snap to fully closed
      gsap.to(bottomDivRef.current, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    setCurrentY(0); // Reset currentY
  };

  return (
    <div className="w-full h-screen bg-white justify-center items-center flex flex-col relative">
      <LocationMap />
      <div
        ref={bottomDivRef}
        className="h-auto w-full absolute bottom-0 bg-white text-black font-bold z-50"
      >
        {/* Drag Handler */}
        <div
          ref={dragHandlerRef}
          className="w-full h-8 bg-gray-300 flex justify-center items-center cursor-grab"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 bg-gray-500 rounded"></div>
        </div>

        {/* Content */}
        <p className="h-[100px] flex items-center pr-[200px] justify-center">
          <img
            className="h-[120px] w-[120px] object-contain"
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLebVsz1pNjN88Pq7SmusZvBl9BCurZan79fKrkaV_m8tIw4yS"
            alt="car"
          />
          <span className="flex flex-col pr-10 items-center justify-center">
            <span className="flex items-center justify-center">
              UberGo
              <span>
                <BoyIcon />
              </span>
            </span>
            <span className="text-[9px]">2mins away, 7:30pm</span>
            <span className="text-[10px]">Affordable, compact rides</span>
          </span>
          <span className="p-3">₹ 573 /-</span>
        </p>
        <p className="h-[100px] flex items-center pr-[200px] justify-center">
          <img
            className="h-[120px] w-[120px] object-contain p-2"
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJCNvVYbc3V-GMD1a5OZNTqWkkshNVTRjMX9Jt0YNqTMpCk9vf"
            alt="car"
          />
          <span className="flex flex-col pr-10 items-center justify-center">
            <span className="flex items-center justify-center">
              UberGo
              <span>
                <BoyIcon />
              </span>
            </span>
            <span className="text-[9px]">2mins away, 7:30pm</span>
            <span className="text-[10px]">Affordable, compact rides</span>
          </span>
          <span className="p-3">₹ 234 /-</span>
        </p>
        <p className=" h-[100px] flex items-center pr-[200px]  justify-center">
          <img
            className="h-[80px] w-[80px] object-contain p-2"
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR1AXMofWHBvX9lOj7GEOOlljfQv1MIIIvchxDbeEtAozNlNipl"
            alt="car"
          />
          <span className=" flex flex-col pr-10 items-center justify-center ">
            <span className="flex items-center justify-center">
              UberGo
              <span>
                <BoyIcon />
              </span>
            </span>
            <span className="text-[9px]">2mins away ,7:30pm</span>
            <span className="text-[10px]">Affordable, compact rides</span>
          </span>
          <span className="p-3">₹ 154 /-</span>
        </p>
      </div>
    </div>
  );
};

export default Ride;
