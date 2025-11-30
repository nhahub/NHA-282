import NavbarLinks from "./NavbarLinks";

/* eslint-disable react/prop-types */

function Sidebar({ close, setClose }) {
  return (
    <div
      className={`top-20 right-0 w-[35vw] max-w-60 bg-mblack p-5 pr-16 text-white fixed h-full z-40  ease-in-out duration-300 ${
        close ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div>
        <NavbarLinks type={"col"} setClose={setClose} />
      </div>
    </div>
  );
}

export default Sidebar;
