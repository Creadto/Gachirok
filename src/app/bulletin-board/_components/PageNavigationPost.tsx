import { useRouter } from "next/navigation";


interface PageNavigationPostProps {
  page: number;
  totalPages: number;
  setPage: (pageNumber: number) => void;
}

/**
 * @Description 페이지를 이동하게 해주는 Component
 * @author 김영서
 **/
const PageNavigationPost = ({ page, totalPages, setPage }: PageNavigationPostProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}&size=10`); // 쿼리 파라미터로 페이지를 전달하여 이동
  };

  return (
    <div className="flex justify-center mt-8 space-x-2 mb-[200px]">
      {/* 첫번째 페이지로 이동 */}
      <button
        className="px-4 py-2 rounded text-black"
        onClick={() => handlePageChange(0)}
        disabled={page - 1 === 0}
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

      {/* 이전 페이지로 이동 */}
      <button
        className={`px-4 py-2 rounded ${page === 0 ? "" : "text-black"}`}
        onClick={() => handlePageChange(page - 1)}
        disabled={page - 1 === 0}
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
          className={`px-4 py-2 rounded ${page === index + 1 ? "bg-black text-white" : "text-neutral-400"}`}
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        className={`px-4 py-2 rounded ${page === totalPages ? "" : "text-black"}`}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
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

      {/* 마지막 페이지 버튼 */}
      <button
        className="px-4 py-2 rounded text-black"
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={page === totalPages}
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
  );
};

export default PageNavigationPost;