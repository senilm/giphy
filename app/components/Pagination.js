const Pagination = ({ onPreviousClick, onNextClick, currentPage,handleButtonClick }) => {
    const totalPages = 10; // Change this to the total number of pages you want to display
    const pagesToShow = 3;
    
    // Calculate the range of page numbers to display
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = startPage + pagesToShow - 1;
    const pageNumbers = Array.from({ length: endPage - startPage + 1  }, (_, i) => i + startPage);
  
    return (
      <>
      <div className="flex justify-center my-4">
        {currentPage > 1 && (
          <button onClick={onPreviousClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
            Previous
          </button>
        )}
        <div className="flex">
        {pageNumbers.map((pageNum)=>(
          <button
          key={pageNum}
          onClick={() => handleButtonClick(pageNum)}
          className={`${pageNum === currentPage ? 'bg-blue-500 text-white' : ''} hover:bg-blue-700 font-bold py-2 px-4 mx-2 rounded`}
          >
            {pageNum}
          </button>
        ))}
        </div>
        <button onClick={onNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
          Next
        </button>
      </div>
        </>
    );
  };
  
  export default Pagination;
  