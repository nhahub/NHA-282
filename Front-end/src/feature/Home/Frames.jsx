import Frameinfo from "../../ui/Frameinfo";
import { formatCurrency } from "../../utils/helper";

function Frames() {
  return (
    <div className="flex flex-col gap-5 md:gap-8 md:flex-row text-center  ">
      <div className="flex gap-12 justify-center md:gap-8">
        <Frameinfo text={"International Brands"} number={formatCurrency(200)} />
        <Frameinfo
          text={"High-Quality Products"}
          number={formatCurrency(2000)}
        />
      </div>
      <Frameinfo text={"Happy Customers"} number={formatCurrency(30000)} />
    </div>
  );
}

export default Frames;
