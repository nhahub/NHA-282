// import { Link } from "react-router-dom";
import CollectionSection from "../feature/Home/CollectionSection";
import HeroSection from "../feature/Home/HeroSection";
import ReviewSection from "../feature/Home/ReviewSection";
// import img1 from "../Assets/img1.png";
// import img2 from "../Assets/img2.png";
// import img3 from "../Assets/img3.png";
// import img4 from "../Assets/img4.png";
import CategoriesCard from "../feature/Categories/CategoriesCard";
import { useProducts } from "../feature/Products/useProducts";
import { islogged } from "../services/Auth";

function Home() {
  const data = [
    {
      image:
        "https://res.cloudinary.com/drvnrjnlg/image/upload/v1729106316/gijhph2w0x46uv2wcebj.png",
      price: 200,
      name: "T-SHIRT WITH TAPE DETAILS",
    },
    {
      image:
        "https://res.cloudinary.com/drvnrjnlg/image/upload/v1729106386/f07su2j44zzer9xlc6qu.png",
      price: 240,
      name: "SKINNY FIT JEANS",
    },
    {
      image:
        "https://res.cloudinary.com/drvnrjnlg/image/upload/v1729106464/mhrbxukgmzkiprqpudt0.jpg",
      price: 180,
      name: "CHECKERED SHIRT",
    },
    {
      image:
        "https://res.cloudinary.com/drvnrjnlg/image/upload/v1729106577/cpwbdzkpd456rauf67wl.jpg",
      price: 130,
      name: "SLEEVE STRIPED T-SHIRT",
    },
  ];
  const { Products } = useProducts();
  const testData = Products?.filter((item) => item.bestseller === true);
  console.log(JSON.stringify(testData?.slice(0, 1)));
  let BestSellerData = data;

  if (testData?.length === 0) {
    BestSellerData = data;
  } else {
    BestSellerData = testData?.slice(0, 4);
  }

  if (!islogged()) {
    BestSellerData = data;
  }

  return (
    <div>
      <HeroSection />
      <CollectionSection title={"Best Seller"} data={BestSellerData} />
      <CategoriesCard />
      {/* <CollectionSection title={"top selling"} data={data2} /> */}
      <ReviewSection />
    </div>
  );
}

export default Home;
