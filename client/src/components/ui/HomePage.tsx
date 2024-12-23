import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";

const HomePage = () => {
  return (
    <div className="w-full h-screen p-5 bg-black justify-center items-center flex ">
      <div className="h-screen w-1/2 bg-black p-10">
        <LabelInputContainer>
          <Label className="ml-6" htmlFor="email">
            Enter your location
          </Label>
          <Input
            id="email"
            className="pl-6"
            type="email"
            placeholder="Current location"
          />
        </LabelInputContainer>
        <div className="w-1 h-[85px] bg-white absolute top-[85px] left-[370px]"></div>
        <LabelInputContainer>
          <Label className="ml-6" htmlFor="email">
            Enter your destination location
          </Label>
          <Input
            id="email"
            type="email"
            className="pl-6"
            placeholder="Destination location"
          />
        </LabelInputContainer>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex flex-col space-y-2">{children}</div>
);

export default HomePage;
