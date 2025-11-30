import master from "../Assets/mester.png";
import pay from "../Assets/pay.png";
import google from "../Assets/google.png";
import paypal from "../Assets/paypal.png";

function RightCopyFooter() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-center md:justify-between container">
      <div className="text-sm text-gray-400 md:text-center md:text-lg ">
        Shop.co © 2000-2024, All Rights Reserved
      </div>
      <div className="flex  justify-items-start gap-1 md:items-center ">
        <img src={master} alt="logo 1" className="w-20" />
        <img src={pay} alt="logo 2" className="w-20" />
        <img src={google} alt="logo 3" className="w-20" />
        <img src={paypal} alt="logo 4" className="w-20" />
      </div>
    </div>
  );
}

export default RightCopyFooter;
