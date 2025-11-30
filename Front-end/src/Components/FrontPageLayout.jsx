import { Outlet } from "react-router-dom";
import Logo from "../ui/Logo";

function FrontPageLayout() {
  return (
    <div className="h-screen items-center">
      <div className="container flex justify-left items-center gap-3 md:mb-10">
        <div className="max-w-44 p-5">
          <Logo></Logo>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default FrontPageLayout;
