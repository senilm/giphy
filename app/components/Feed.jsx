'use client';
import { useContext, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { DataContext } from "../context/DataProvider";
import Loader from "./Loader";

const Feed = () => {
  const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
  const [gifData, setGifData] = useState([]);
  const [type, setType] = useState('trending');
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 8;

  const calculateOffset = (page) => (page - 1) * limit;

  const apiUrl = `https://api.giphy.com/v1/gifs/${type}?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${calculateOffset(currentPage)}`;

  let debounceTimeout;


  const fetchGif = async () => {
    const newType = searchTerm ? 'search' : 'trending';
    setType(newType);
    
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      setGifData(data.data);
      setIsLoading(false);
    } else {
      throw new Error('Failed to fetch data');
    }
  };

  useEffect(() => {
    // Clear previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // Set a new debounce timeout
    debounceTimeout = setTimeout(() => {
      fetchGif();
    }, 500); 
    
    // Clean up the timeout when the component unmounts
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [searchTerm, type, apiUrl]);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleButtonClick = (num) =>{
    setCurrentPage(num);
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {isLoading ? (
        <div className="min-w-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {gifData.map((gif) => (
              <div className="flex flex-col relative" key={gif.id}>
                <div className="w-full overflow-hidden shadow-md p-2 rounded-lg">
                  <iframe
                    src={gif.embed_url}
                    alt="Gif"
                    className="w-full h-auto relative hover:scale-125 transition-all"
                  />
                </div>
                <div className="p-2">
                  <p className="text-center text-gray-700 font-semibold">{gif.title}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
            currentPage={currentPage}
            handleButtonClick={handleButtonClick}
          />
        </>
      )}
    </>
  );
};

export default Feed;




