// import { useNavigate } from "react-router-dom";
// import Button from "../ui/Button";
// import DivMotion from "../ui/DivMotion";
// import model from "./../Assets/heroModel.png";

// function FrontPage() {
//   const nav = useNavigate();
//   console.log("here");
//   return (
//     <section
//       className="h-full w-full bg-cover "
//       style={{ backgroundImage: `url(${model})` }}
//     >
//       <div className="flex h-full items-center justify-center px-6 py-8 mx-auto  bg-black bg-opacity-50 ">
//         <div className="flex w-10/12 justify-center items-center">
//           <DivMotion>
//             <div className="shadow-xl p-5 rounded-lg bg-white bg-opacity-45 sm:max-w-md">
//               <div className="w-full flex justify-center mb-9  ">
//                 <h1 className="text-black text-3xl font-bold md:mb-10 ">
//                   Welcome to{" "}
//                   <span className="font-extrabold font-sans">SHOP.CO</span>
//                 </h1>
//               </div>
//               <div className="w-full flex flex-col justify-center  items-center mb-9  ">
//                 <div className="mt-5 w-full  flex justify-center">
//                   <Button type={"frontPage"} onClick={() => nav("/login")}>
//                     Login
//                   </Button>
//                 </div>
//                 <div className="mt-5 w-full  flex justify-center">
//                   <Button type={"frontPage"} onClick={() => nav("/signup")}>
//                     Signup
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </DivMotion>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FrontPage;
