import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const Navbar = ({ handleLogout }) => {

    const {SetSearchTerm} = useContext(DataContext)
  return (
    <nav>
      <div className="flex justify-between">
        <div id="logo">Logo</div>
        <form>
          <input type="text" className="border-2 border flex-1 focus:outline-none w-96 p-4" placeholder="Article name or Keywords" onChange={(e)=>SetSearchTerm(e.target.value)} />
        </form>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
