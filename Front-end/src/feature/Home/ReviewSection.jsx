import Slider from "react-slick";
import Review from "../../ui/Review";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import DivMotion from "../../ui/DivMotion";

/* eslint-disable react/prop-types */

function SampleNextArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none", // Remove the background color
      }}
      onClick={onClick}
    >
      <GrLinkNext className="text-mblack " size={20} />
    </div>
  );
}

function SamplePrevArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none", // Remove the background color
      }}
      onClick={onClick}
    >
      <GrLinkPrevious className="text-mblack" size={20} />
      {/* Match size with next arrow */}
    </div>
  );
}

function ReviewSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const RespSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const data = [
    {
      rating: 3,
      name: "Mohamed",
      text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    },
    {
      rating: 4,
      name: "Ahmed",
      text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    },
    {
      rating: 2,
      name: "Sarah",
      text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    },
    {
      rating: 5,
      name: "Remi",
      text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    },
  ];
  return (
    <DivMotion>
      <div className=" container">
        <h1 className="font-extrabold text-5xl uppercase mb-10">
          OUR HAPPY CUSTOMERS
        </h1>
        <div className="hidden m-10 md:block">
          <Slider {...settings}>
            {data.map((item, index) => (
              <Review
                key={index}
                rating={item.rating}
                name={item.name}
                text={item.text}
              />
            ))}
          </Slider>
        </div>
        <div className="block md:hidden p-10">
          <Slider {...RespSettings}>
            {data.map((item, index) => (
              <Review
                key={index}
                rating={item.rating}
                name={item.name}
                text={item.text}
              />
            ))}
          </Slider>
        </div>
      </div>
    </DivMotion>
  );
}

export default ReviewSection;
