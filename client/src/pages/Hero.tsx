import { FeaturesSectionDemo } from "../components/ui/Box";
import { WorldMapDemo } from "../components/ui/Map";
import { TypewriterEffectDemo } from "../components/ui/TypeWriterEffectDemo";

const Hero = () => {
  return (
    <div className="w-full bg-black">
      <div className="w-full h-screen">
        <p className="absolute top-5 left-5 text-white text-[30px] font-bold font-sans">
          Glide
        </p>
        <TypewriterEffectDemo />
      </div>

      <div className="w-full p-4">
        <WorldMapDemo />
      </div>
      <div className="w-full">
        <FeaturesSectionDemo />
      </div>
    </div>
  );
};

export default Hero;
