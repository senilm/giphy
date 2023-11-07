
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Button from "./Button";
const Navbar = ({ handleLogout }) => {

const {SetSearchTerm} = useContext(DataContext)
  return (
    <nav>
      <div className="flex justify-between">
        <div id="logo">Logo</div>
        <div className="flex gap-5">
        <form>
          <input type="text" className="border-2 rounded-[10px] flex-1 focus:outline-none w-96 p-4" placeholder="Article name or Keywords" onChange={(e)=>SetSearchTerm(e.target.value)} />
        </form>
        <Button label={'Search'}/>
        </div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
