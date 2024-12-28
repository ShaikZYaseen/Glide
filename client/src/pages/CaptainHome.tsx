import LocationMap from "../components/ui/LocationMap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ME from "../assets/ME.jpeg";

const CaptainHome = () => {
  return (
    <div className="w-full bg-black h-screen">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div className="absolute bottom-0 w-full h-[259px]] flex flex-col items-center justify-center bg-black">
        <div className="flex justify-center items-center">
          <span className="h-[60px] w-[60px] rounded-[50%]">
            <img
              className="h-[60px] w-[60px]  rounded-[50%]"
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

        <div className="flex items-center justify-center">
          <div>
            <span className="text-white">
              <AccessTimeIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
