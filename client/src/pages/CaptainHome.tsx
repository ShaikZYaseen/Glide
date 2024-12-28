import LocationMap from "../components/ui/LocationMap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ME from "../assets/ME.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";
import { captainLogout } from "../services/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CaptainHome = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await captainLogout();
    if (response.success) {
      localStorage.removeItem("token");
      toast.success(response.message);
      navigate("/captain-login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full bg-black h-screen relative">
      <Toaster />
      <span
        onClick={() => handleLogout()}
        className="absolute top-4 right-4 text-black font-extrabold p-1 hover:text-gray-500 z-50 cursor-pointer"
      >
        <LogoutIcon />
      </span>
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div className="absolute bottom-0 w-full h-[259px]] flex flex-col items-center justify-center bg-black">
        <div className="flex justify-center items-center">
          <span className="h-[60px] w-[60px] rounded-[50%]">
            <img
              className="h-[60px] w-[60px]  rounded-[50%] object-contain"
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

        <div className="flex items-center justify-center p-2">
          <div className=" flex flex-col items-center justify-center mr-2 p-2 bg-gray-600 rounded-md">
            <span className="text-white">
              <AccessTimeIcon />
            </span>
            <p className="text-white text-[12px]">10.2</p>
            <p className="text-white text-[12px]">Hours Online</p>
          </div>
          <div className=" flex flex-col mr-2 items-center justify-center p-2 bg-gray-600 rounded-md">
            <span className="text-white">
              <AccessTimeIcon />
            </span>
            <p className="text-white text-[12px]">10.2</p>
            <p className="text-white text-[12px]">Hours Online</p>
          </div>
          <div className=" flex flex-col items-center justify-center p-2 bg-gray-600 rounded-md">
            <span className="text-white">
              <AccessTimeIcon />
            </span>
            <p className="text-white text-[12px]">10.2</p>
            <p className="text-white text-[12px]">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
