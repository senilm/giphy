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

const homePage = () => {
  const router = useRouter();
  const {isAuth, setIsAuth} = useContext(DataContext)

  const handleLogout = () =>{
    signOut(auth)
    .then(() => {
      console.log('signed out');
      setIsAuth(false)
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
  <Navbar handleLogout={handleLogout}/>

  <Feed/>
 
  </>
  );
};

export default homePage;
