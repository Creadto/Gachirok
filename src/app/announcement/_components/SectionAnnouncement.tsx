"use client";

import { useEffect, useState } from "react";
import { AnCategoryToNumber } from "@/app/announcement/utils/Category";
import axios from "axios";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import Announcement from "@/app/announcement/_components/Announcement";

interface AnnouncementItem {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    imageUrl: string;
    likes:number;
    popular:number;
    comments:number;
}

interface SectionAnnouncementProps {
    section: string;
    page: string;
    limit: string;
    sort: string;
    regionType:string;
}

export default function SectionAnnouncement(props: SectionAnnouncementProps) {


    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const {section:section, page:page, limit:limit, sort:sort, regionType:regionType} = props;

    const sectionId = AnCategoryToNumber[section];
    const countryCode = params['country-code']; // local 일 경우

    const [sectionAnnouncement, setSectionAnnouncement] = useState<AnnouncementItem[]>([]); // 섹션의 공지사항 목록
    const [currentPage, setCurrentPage] = useState(parseInt(page)); // 현재 페이지
    const [totalPageCount, setTotalPageCount] = useState(0); // 페이지 총 개수
    const [totalAnnouncementsCount, setTotalAnnouncementsCount] = useState(0); // 공지 총 개수
    const [sortOrder, setSortOrder] = useState("newest"); // 기본 정렬: 신규순

    const maxPageGroupSize = 5; // 하단 페이지 그룹에 보여줄 페이지 개수
    const start = Math.floor((currentPage - 1) / maxPageGroupSize) * maxPageGroupSize + 1; // 하단 페이지 그룹의 시작
    const end = Math.min(start + maxPageGroupSize - 1, totalPageCount); // 하단 페이지 그룹의 끝

    const goToPreviousPage = () => {
        const newPage = Math.max(currentPage - 1, 1);
        setCurrentPage(newPage);
        if(regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    const goToNextPage = () => {
        const newPage = Math.min(currentPage + 1, totalPageCount);
        setCurrentPage(newPage);
        if(regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    const goToPage = (page: number) => { // 클릭 시 해당 숫자 페이지로 이동
        setCurrentPage(page);
        if(regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${sectionId}?page=${page}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/announcement/universal/section/${sectionId}?page=${page}&limit=${limit}&sort=${sort}`);
        }
    };

    // 이전 페이지 그룹으로 이동
    const goToPreviousGroupPage = () => {
        const newPage = Math.max(start - 1, 1);
        setCurrentPage(newPage);
        if(regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    // 다음 페이지 그룹으로 이동
    const goToNextGroupPage = () => {
        const newPage = Math.min(end + 1, totalPageCount);
        setCurrentPage(newPage);
        if(regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
        else{
            router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${sort}`);
        }
    };

    const handleSortChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const newPage = currentPage
        setSortOrder(e.target.value);
        if(regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${e.target.value}`);
        }
        else{
            router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${limit}&sort=${e.target.value}`);
        }
    }

    const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/announcements/section/${sectionId}?page=${page}&limit=${limit}&sort=${sort}`
            );
            setSectionAnnouncement(response.data.announcementData);
            setTotalPageCount(response.data.totalPages);
            setTotalAnnouncementsCount(response.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [searchParams]);

    return (
        <div className="py-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl py-4">{totalAnnouncementsCount}개의 공지</h2>
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="bg-[#f6f6f6] cursor-pointer hover:bg-gray-300"
                >
                    <option value="newest">신규순</option>
                    <option value="popular">조회순</option>
                    <option value="likes">좋아요순</option>
                    <option value="comments">댓글순</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {sectionAnnouncement.map((announcement) => (
                    <div key={announcement.id} className="border rounded-lg p-4 cursor-pointer hover:bg-blue-100 hover:text-white">
                        <Announcement
                            id={announcement.id}
                            title={announcement.title}
                            category={announcement.category}
                            description={announcement.description}
                            date={announcement.date}
                            imageUrl={announcement.imageUrl}
                            likes={announcement.likes}
                            popular={announcement.popular}
                            comments={announcement.comments}
                            regionType={props.regionType}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center py-16">
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
            </div>
        </div>
    );
}
