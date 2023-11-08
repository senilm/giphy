"use client";
import { useContext, useEffect, useState } from "react";

import { DataContext } from "../context/DataProvider";
import Loader from "../components/Loader";
import { useSearchParams } from "next/navigation";
import { getDoc,doc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Favorite = () => {
  const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
  const [gifData, setGifData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('')
  const searchParams = useSearchParams()
  const [authUser, SetAuthUser] = useState('')
  const [temp, setTemp] = useState(true)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid); //worked
        SetAuthUser(user.uid)
      } else {
        console.log('error in home/page');
      }
    });
  },[])

  useEffect(() => {
    setUserId(searchParams.get('userId'));

    const fetchFavs = async () => {
      try {
        setIsLoading(true);
        const userId = searchParams.get('userId');
        if (userId) {
          const userFavoriteGif = await getDoc(doc(db, 'users', userId));
          setFavoriteData(userFavoriteGif.data().favoriteGif);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error in favorite', error);
        setIsLoading(false);
      }
    };

    fetchFavs();
  }, [searchParams,temp]);

  useEffect(() => {
    setIsLoading(true);

    const getAllGIFs = async () => {
      const fetchedGIFs = [];

      await Promise.all(
        favoriteData.map(async (item) => {
          const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${item}`;
          const ans = await fetch(url);
          const response = await ans.json();
          console.log(response.data);
          fetchedGIFs.push(...response.data);
        })
      );

      setGifData(fetchedGIFs);
      setIsLoading(false);
    };

    getAllGIFs();
  }, [favoriteData,temp]);
  


  const handleFavorite = async (gifId) =>{
    const response = await fetch(`api/favorite/${authUser}?gifId=${gifId}`)
    const data = await response.json()
    setTemp(prev => !prev)
    // console.log(data);
  }

  return (
    <>
      {isLoading ? (
        <div className="min-w-screen">
          <Loader />
        </div>
      ) : (
        <>
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-5 bg-gray-100">
  <div className="rounded-lg bg-white px-4 sm:px-5 md:px-6 lg:px-10 py-1 pt-4 min-h-screen">
        <Navbar/>
          {gifData.length > 0 ? 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {gifData?.map((gif) => (
              <div className="flex flex-col relative" key={gif.id}>
                <div className="w-full overflow-hidden shadow-md p-2 rounded-lg">
                  <iframe
                    src={gif.embed_url}
                    alt="Gif"
                    className="w-full h-auto relative hover:scale-125 transition-all"
                  />
                </div>
                <div className="p-2 flex justify-between">
                  <p className="text-center text-gray-700 font-semibold">
                    {gif.title}
                  </p>
                  <button onClick={()=>handleFavorite(gif.id)}>Remove From Favorite</button>
                </div>
              </div>
            ))}
          </div> : <div className="text-center text-3xl">No Data to show</div>}
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default Favorite;
