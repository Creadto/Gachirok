interface PageNavigationProps {
  currentPage : number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;

}
/**
 * @Description 페이지를 이동하게 해주는 Component
 * @author 김영서
 **/
const PageNavigation = ({currentPage, totalPages, handlePageChange}: PageNavigationProps) => {

  return(
    <div className="flex justify-center mt-8 space-x-2 mb-10">
        <button
          className="px-4 py-2 rounded text-black"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.79731 2.27344L4.90039 6.02344L8.79731 9.77344"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.74805 1.81641V6.02412L4.74848 10.1841"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "" : "text-black"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.87348 2.25L3.97656 6L7.87348 9.75"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 페이지 넘버 버튼들 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "text-neutral-400"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "" : " text-black"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.12652 9.75L8.02344 6L4.12652 2.25"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="px-4 py-2 rounded text-black"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.20269 9.72656L7.09961 5.97656L3.20269 2.22656"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.25195 10.1836L7.25195 5.97588L7.25152 1.81592"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
  )
}

export default PageNavigation