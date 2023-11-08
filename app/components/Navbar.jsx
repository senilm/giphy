'use client'
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Button from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUrl } from 'nextjs-current-url';

const Navbar = ({ handleLogout, authUser }) => {
  const { SetSearchTerm } = useContext(DataContext);
  const router = useRouter();
  const { pathname } = useUrl()??{};
  return (
    <nav className=" bg-white rounded-2xl ">
      <div className="flex flex-row justify-between items-center">
        <div id="logo" className="flex items-center justify-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg"
            width={150}
            height={80}
            className=" max-sm:w-10 max-sm:h-10"
            alt="Logo"
          />
        </div>
        <div className="flex lg:gap-5 max-lg:gap-2">
          {pathname !== '/favorite' && (
            <>
            <form>
            <input
              type="text"
              className=" rounded-[10px] bg-gray-100 flex-1 focus:outline-none max-md:w-[7rem] max-md:text-xs w-full lg:p-3 max-lg:py-1 lg:w-96 max-lg:px-3"
              placeholder="Article name or Keywords"
              onChange={(e) => SetSearchTerm(e.target.value)}
              />
          </form>
          <Button label={"Search"} />
              </>
          )}
        </div>
        <div className="flex max-lg:gap-2 lg:gap-4">
        {pathname !== '/favorite' && (
          <Button feature={()=>(router.push(`/favorite?userId=${authUser}`))} label={'Favorites'}/>
        )}
        {pathname !== '/favorite' && (
        <Button feature={handleLogout} label={"Log out"} />
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
