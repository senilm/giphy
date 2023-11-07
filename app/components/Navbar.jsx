
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Button from "./Button";
const Navbar = ({ handleLogout }) => {

const {SetSearchTerm} = useContext(DataContext)
  return (
    <nav className=" bg-white rounded-2xl">
      <div className="flex justify-between">
        <div id="logo" className="flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg"  width={150} height={200} /></div>
        <div className="flex gap-5">
        <form>
          <input type="text" className=" rounded-[10px] bg-gray-100 flex-1 focus:outline-none w-96 py-2 px-3" placeholder="Article name or Keywords" onChange={(e)=>SetSearchTerm(e.target.value)} />
        </form>
        <Button label={'Search'} />
        </div>
        <Button feature={handleLogout} label={'Log out'}/>
      </div>
    </nav>
  );
};

export default Navbar;
