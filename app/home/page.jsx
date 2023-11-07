"use client"
import {auth} from "../firebase";
import { getAuth, signOut,onAuthStateChanged  } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Pagination from "../components/Pagination";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const router = useRouter();
  const {isAuth, setIsAuth} = useContext(DataContext)

  useEffect(()=>{
    if (localStorage.getItem('isAuthenticated')!== 'true'){
        router.push('/')
    }
  },[router])

  const handleLogout = () =>{
    signOut(auth)
    .then(() => {
      console.log('signed out');
      setIsAuth(false)
      localStorage.clear()
      router.push('/')
    })
    .catch((error) => {
      console.log('failed to sign out');
    });
  }

  // useEffect(()=>{
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //     } else {

  //     }
  //   });
  // },[])
  return (
  <>
  <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-5 bg-gray-100">
  <div className="rounded-lg bg-white px-4 sm:px-5 md:px-6 lg:px-10 py-1">
    <Navbar handleLogout={handleLogout} />
    <Feed />
  </div>
</div>

  </>
  );
};

export default HomePage;
