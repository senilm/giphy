import Button from "./Button";
const Pagination = ({ onPreviousClick, onNextClick, currentPage,handleButtonClick }) => {
    const totalPages = 10; 
    const pagesToShow = 3;
    
    
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = startPage + pagesToShow - 1;
    const pageNumbers = Array.from({ length: endPage - startPage + 1  }, (_, i) => i + startPage);
  
    return (
      <>
      <div className="flex justify-center my-4">
        {currentPage > 1 && (
          <Button feature={onPreviousClick}  label={'Prev'}/>
        )}
        <div className="flex">
        {pageNumbers.map((pageNum)=>(
          <button
          key={pageNum}
          onClick={() => handleButtonClick(pageNum)}
          className={`${pageNum === currentPage ? 'bg-black text-white' : ''}  font-bold py-2 px-4 mx-2 rounded`}
          >
            {pageNum}
          </button>
        ))}
        </div>
        <Button feature={onNextClick} label={'Next'} />
      </div>
        </>
    );
  };
  
  export default Pagination;
  