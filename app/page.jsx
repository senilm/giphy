'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { DataContext } from "./context/DataProvider";


export default function Home() {
  const router = useRouter();
  const {isAuth} = useContext(DataContext)

  useEffect(() => {
    if (isAuth) {
      router.push('/home'); 
    } else {
      router.push('/auth'); 
    }
  }, [isAuth]);
  
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
