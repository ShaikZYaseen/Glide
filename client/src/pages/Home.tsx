import { useState } from "react";
import HomePage from "../components/ui/HomePage";
import RideConfirmComponent from "../components/ui/RideConfirmComponent";
import Ride from "./Ride";
import DriverConfirmation from "../components/ui/DriverConfirmation";

const Home = () => {
  const [home, setHome] = useState(true);
  const [rideType, setRideType] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [confirmDriver, setConfirmDriver] = useState(false);
  return (
    <div>
      {home && <HomePage />}

      {rideType && <Ride setConfirmRide={setConfirmRide} setHome={setHome} />}
      {confirmRide && <RideConfirmComponent />}
      {confirmDriver && <DriverConfirmation />}
    </div>
  );
};

export default Home;
