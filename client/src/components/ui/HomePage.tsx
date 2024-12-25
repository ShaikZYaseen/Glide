import React, { useRef } from "react";
import LocationPanel from "./LocationPanel";
import { Input } from "./Input";
import { gsap } from "gsap";
import LocationMap from "./LocationMap";

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [div, setDiv] = React.useState(false);

  const handleFocus = () => {
    setDiv(true);
    gsap.to(containerRef.current, {
      y: -window.innerHeight + 180,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleBlur = () => {
    setDiv(false);
    gsap.to(containerRef.current, {
      y: 0, // Reset the container to its original position
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div className="w-full h-screen bg-black  justify-center items-center flex flex-col relative">
      {!div && <LocationMap />}

      {div && <LocationPanel />}
      <div
        ref={containerRef}
        className="h-45 w-full bg-black p-4 absolute bottom-0 flex justify-center items-center text-sm"
      >
        <div className="w-2/3 p-3">
          {" "}
          <h1 className="text-white text-xl font-bold p-2">Find a trip</h1>
          <LabelInputContainer>
            <Input
              id="email"
              className="pl-6 h-[30px] w-full text-sm"
              type="email"
              placeholder="Current location"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Input
              id="destination"
              className="pl-6 h-[30px] w-full text-sm"
              type="email"
              placeholder="Destination location"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </LabelInputContainer>
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex flex-col space-y-2">{children}</div>
);

export default HomePage;
