import { WorldMapDemo } from "../components/ui/Map";
import { TypewriterEffectDemo } from "../components/ui/TypeWriterEffectDemo";

const Hero = () => {
  return (
    <div className="w-full bg-black">
      <div className="w-full h-screen">
        <TypewriterEffectDemo />
      </div>
      <div className="w-full p-4">
        <WorldMapDemo />
      </div>
    </div>
  );
};

export default Hero;
