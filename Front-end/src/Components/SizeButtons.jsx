/* eslint-disable react/prop-types */

import Button from "../ui/Button";

function SizeButtons({ size, setSize, sizes }) {
  console.log(sizes);
  return (
    <div className="flex gap-3 justify-start w-full  md:w-2/3">
      {sizes.map((oneSize, index) => {
        return (
          <Button
            key={index}
            onClick={() => setSize(oneSize)}
            type={"size"}
            active={size === oneSize}
          >
            {oneSize}
          </Button>
        );
      })}
    </div>
  );
}

export default SizeButtons;
