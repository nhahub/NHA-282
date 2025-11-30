import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import logo from "../Assets/logo.png";

function AppLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoading();
      console.log("Document is already ready");
    } else {
      window.addEventListener("load", handleLoading);
      console.log("Event listener added for load event");
    }

    return () => {
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const delayTimeout = setTimeout(() => {
        setIsDelayComplete(true);
      }, 1000);

      return () => clearTimeout(delayTimeout);
    }
  }, [isLoading]);

  if (isLoading || !isDelayComplete)
    // if(isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-white">
        <img className="w-1/5 animate-pulse mb-5" src={logo} alt="Logo" />
        <div className="animate-spin rounded-full sm:size-16 size-10 border-t-2 border-b-2 border-mblack"></div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="pt-28">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
