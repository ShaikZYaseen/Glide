import React, { useEffect, useRef } from "react";
import LocationPanel from "./LocationPanel";
import { Input } from "./Input";
import { gsap } from "gsap";
import LocationMap from "./LocationMap";
import { getSuggestions } from "../../services/ride";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

interface homeProps {
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
  setRideType: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage = ({ setHome, setRideType }: homeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const [div, setDiv] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [activeField, setActiveField] = React.useState<
    "location" | "destination" | null
  >(null);

  const handleFocus = (field: "location" | "destination") => {
    setActiveField(field);
    setDiv(true);
    gsap.to(containerRef.current, {
      y: -window.innerHeight + 180,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const getSuggestionsLocation = async (value: string) => {
    const data = await getSuggestions(value);
    setSuggestions(data.suggestions);
  };

  useEffect(() => {
    if (location) {
      getSuggestionsLocation(location);
    }
    if (location == "" || destination == "") {
      setSuggestions([]);
    }
    if (destination) {
      getSuggestionsLocation(destination);
    }
  }, [location, destination]);

  return (
    <div className="w-full h-screen bg-black justify-center items-center flex flex-col relative">
      <Toaster />
      {!div && <LocationMap />}

      {div && (
        <LocationPanel
          suggestions={suggestions}
          setLocation={(placeName) => {
            if (activeField === "location") {
              setLocation(placeName);
              setTimeout(() => {
                destinationInputRef.current?.focus();
              }, 0);
            }
          }}
          setDestination={(placeName) => {
            if (activeField === "destination") {
              setDestination(placeName);
            }
          }}
          setSuggestions={setSuggestions}
        />
      )}

      <div
        ref={containerRef}
        className="h-45 w-full bg-black p-4 absolute bottom-0 flex justify-center items-center text-sm"
      >
        <div className="w-2/3 p-3">
          <h1 className="text-white text-xl font-bold p-2">Find a trip</h1>
          <LabelInputContainer>
            <Input
              id="location"
              className="pl-6 h-[30px] w-full text-sm"
              type="text"
              placeholder="Current location"
              value={location}
              onClick={() => setSuggestions([])}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => handleFocus("location")}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Input
              id="destination"
              className="pl-6 h-[30px] w-full text-sm"
              type="text"
              placeholder="Destination location"
              value={destination}
              onClick={() => setSuggestions([])}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => handleFocus("destination")}
              ref={destinationInputRef}
            />
          </LabelInputContainer>
        </div>
        <div className="">
          <button
            onClick={() => {
              if (location === "" || destination === "") {
                toast.error("Please enter a valid location and destination");
                return;
              }
              setHome(false); // Set home to false
              setRideType(true); // Set ride type to true
            }}
            className="text-black w-1`/3 p-3 ml-10 font-bold rounded-xl mt-7 bg-white w-full"
          >
            Find ride
          </button>
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex flex-col space-y-2">{children}</div>
);

export default HomePage;
