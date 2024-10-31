"use client";

import axios from "axios";
import {categoryToNumber} from "@/app/news/utils/Category";
import {useEffect, useState} from "react";
import DetailNews from "@/app/news/universal/_components/DetailNews";
import {useParams, useRouter, useSearchParams} from "next/navigation";

interface newsItem {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    visitCount: number;
    like: number;
    disLike: number;
    reply: number;
    imageUrl: string;
}

interface props{
    categoryId : string;
    regionType : string;
}

export default function DetailSectionNews(props : props) {


    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const countryCode = params['country-code'];

    // const {section:section, page:page, limit:limit, sort:sort, regionType:regionType} = searchParams
    const section = props.categoryId;
    const regionType = props.regionType;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const sort = searchParams.get("sort");

    const [sectionNews, setSectionNews] = useState<newsItem[]>([]);

    const [currentPage, setCurrentPage] = useState(parseInt(page)); // 현재 페이지
    const [totalPageCount, setTotalPageCount] = useState(0); // 페이지 총 개수
    const [totalNewsCount, setTotalNewsCount] = useState(0); // 공지 총 개수
    const [sortOrder, setSortOrder] = useState("newest"); // 기본 정렬: 신규순

    const categoryId = section
    const maxPageGroupSize = 5; // 하단 페이지 그룹에 보여줄 페이지 개수
    const start = Math.floor((currentPage - 1) / maxPageGroupSize) * maxPageGroupSize + 1; // 하단 페이지 그룹의 시작
    const end = Math.min(start + maxPageGroupSize - 1, totalPageCount); // 하단 페이지 그룹의 끝


    const goToPreviousPage = () => {
        const newPage = Math.max(currentPage - 1, 1);
        setCurrentPage(newPage);
        if(regionType === "local") {
            router.push(`/news/local/${countryCode}/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/news/universal/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    const goToNextPage = () => {
        const newPage = Math.min(currentPage + 1, totalPageCount);
        setCurrentPage(newPage);
        if(regionType === "local"){
            router.push(`/news/local/${countryCode}/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/news/universal/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    const goToPage = (page: number) => { // 클릭 시 해당 숫자 페이지로 이동
        setCurrentPage(page);
        if(regionType ==="local"){
            router.push(`/news/local/${countryCode}/section/${categoryId}?page=${page}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/news/universal/section/${categoryId}?page=${page}&limit=${limit}&sort=${sort}`);
        }
    };

    // 이전 페이지 그룹으로 이동
    const goToPreviousGroupPage = () => {
        const newPage = Math.max(start - 1, 1);
        setCurrentPage(newPage);
        if(regionType ==="local"){
            router.push(`/news/local/${countryCode}/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/news/universal/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    // 다음 페이지 그룹으로 이동
    const goToNextGroupPage = () => {
        const newPage = Math.min(end + 1, totalPageCount);
        setCurrentPage(newPage);
        if(regionType === "local"){
            router.push(`/news/local/${countryCode}/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/news/universal/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    const handleSortChange=(e)=>{
        const newPage = currentPage
        setSortOrder(e.target.value);
        if(regionType === "local"){
            router.push(`/news/local/${countryCode}/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${e.target.value}`);
        }
        else{
            router.push(`/news/universal/section/${categoryId}?page=${newPage}&limit=${limit}&sort=${e.target.value}`);
        }
    }

    const fetchSectionNews = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/section/${categoryId}?page=${page}&limit=${limit}&sort=${sort}`);
            setSectionNews(response.data.newsData);
            setTotalPageCount(response.data.totalPages);
            setTotalNewsCount(response.data.length);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSectionNews();
    }, [searchParams])


    return (
        <div>
            <section>
                <div className="flex flex-row justify-between">
                    <p className="text-[18px] font-bold">{totalNewsCount}개의 뉴스</p>
                    <form>
                        <select onChange={handleSortChange} className="text-[13px] h-[20px] bg-[#f6f6f6]">
                            <option value="newest">신규순</option>
                            <option value="popular">조회 높은순</option>
                            <option value="likes">추천 높은순</option>
                            <option value="comments">댓글 높은순</option>
                        </select>
                    </form>
                </div>
            </section>
            <section className="grid grid-cols-2 gap-[20px] mt-[25px]">
                {sectionNews.map((item) => (
                    <div key={item.id}>
                        <DetailNews news={item}/>
                    </div>
                ))}
            </section>
            <section className="flex justify-center py-16">
                <button
                    className="px-2 rounded hover:bg-gray-300"
                    onClick={goToPreviousGroupPage}
                    disabled={currentPage === 1}
                >
                    &laquo;
                </button>
                <button
                    className="px-4 rounded hover:bg-gray-300"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({length: end - start + 1}, (_, idx) => start + idx).map((page) => (
                    <button
                        key={page}
                        className={`px-4 rounded hover:bg-gray-300 ${currentPage === page ? "bg-gray-700 text-white" : ""}`}
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="px-4 rounded hover:bg-gray-300"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPageCount}
                >
                    &gt;
                </button>
                <button
                    className="px-2 rounded hover:bg-gray-300"
                    onClick={goToNextGroupPage}
                    disabled={currentPage === totalPageCount}
                >
                    &raquo;
                </button>
            </section>
        </div>
    );
}