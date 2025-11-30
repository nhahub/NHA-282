import { useNavigate } from "react-router-dom";
import HeroModel from "../../Components/HeroModel";
import Button from "../../ui/Button";
import DivMotion from "../../ui/DivMotion";
import Frames from "./Frames";
// import HeroFooter from "./HeroFooter";
import { islogged } from "../../services/Auth";

function HeroSection() {
  const nav = useNavigate();
  return (
    <div id="home">
      <DivMotion>
        <div className="flex w-full flex-col lg:flex-row gap-5 lg:gap-20 items-center  justify-center container">
          <div className="space-y-6 text-center md:text-start   md:space-y-20 flex flex-col md:flex-row  md:block ">
            <div className="space-y-6">
              <h1 className="font-extrabold text-5xl ">
                FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
              </h1>
              <p className="text-gray-500 line-clamp-3 w-full md:2/3 ">
                Browse through our diverse range of meticulously crafted
                garments,
                <br className="hidden md:inline" />
                designed to bring out your individuality and cater to your sense
                of style.
              </p>

              <Button
                type={"black"}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  islogged() ? nav("/products") : nav("/login");
                }}
              >
                Shop Now
              </Button>
            </div>
            <Frames />
          </div>

          <HeroModel />
        </div>
        {/* <HeroFooter /> */}
      </DivMotion>
    </div>
  );
}

export default HeroSection;
