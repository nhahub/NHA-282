import React from "react";
import {assets} from '../assets/assets.js'
const Navbar = ({setToken}) => {
  return(
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-12" src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className="bg-black text-white px-2 py-2 sm:px-5 sm:py-2 rounded-full text-lg sm:text-sm">Logout</button>
    </div>
  )
}

export default Navbar