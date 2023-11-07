
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Button from "./Button";
import Image from "next/image";
const Navbar = ({ handleLogout }) => {

const {SetSearchTerm} = useContext(DataContext)
  return (
    <nav className=" bg-white rounded-2xl ">
      <div className="flex flex-row justify-between items-center">
        <div id="logo" className="flex items-center justify-center"><Image src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg" width={150} height={80}  className=" max-sm:w-10 max-sm:h-10" alt="Logo" /></div>
        <div className="flex lg:gap-5 max-lg:gap-2">
        <form>
          <input type="text" className=" rounded-[10px] bg-gray-100 flex-1 focus:outline-none max-md:w-[7rem] max-md:text-xs w-full lg:p-3 max-lg:py-1 lg:w-96 max-lg:px-3" placeholder="Article name or Keywords" onChange={(e)=>SetSearchTerm(e.target.value)} />
        </form>
        <Button label={'Search'} />
        </div>
        <Button feature={handleLogout} label={'Log out'}/>
      </div>
    </nav>
  );
};

export default Navbar;
