import gruop from "../../Assets/Group.png";
import zara from "../../Assets/zara.png";
import prada from "../../Assets/prada.png";
import gucci from "../../Assets/gucci.png";
import clv from "../../Assets/Clv.png";

function HeroFooter() {
  return (
    <div className="w-full bg-mblack py-10 container mb-5">
      <ul className="flex flex-col lg:flex-row gap-5 items-center lg:gap-32 justify-center">
        <ul className="flex md:gap-32 gap-20">
          <li>
            <img src={gruop} alt="versace" />
          </li>
          <li>
            <img src={zara} alt="zara" />
          </li>
          <li>
            <img src={prada} alt="prada" />
          </li>
        </ul>
        <ul className="flex lg:gap-32 gap-20">
          <li>
            <img src={gucci} alt="gucci" />
          </li>
          <li>
            <img src={clv} alt="calvin klein" />
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default HeroFooter;
