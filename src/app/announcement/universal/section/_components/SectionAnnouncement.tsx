"use client";

import { useEffect, useState } from "react";
import { AnCategoryToNumber } from "@/app/announcement/utils/Category";
import axios from "axios";
import Announcement from "@/app/announcement/universal/section/_components/Announcement";
import { useRouter, useSearchParams } from "next/navigation";

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
}

export default function SectionAnnouncement(params: SectionAnnouncementProps) {
    const sectionId = AnCategoryToNumber[params.section];

    const [sectionAnnouncement, setSectionAnnouncement] = useState<AnnouncementItem[]>([]);
    const [currentPage, setCurrentPage] = useState(parseInt(params.page));
    const [totalPage, setTotalPage] = useState(0);
    const [totalLength, setTotalLength] = useState(0);
    const [sortOrder, setSortOrder] = useState("newest"); // 기본 정렬: 신규순
    const router = useRouter();
    const searchParams = useSearchParams();

    const maxPageGroupSize = 5; // 페이지 그룹에 보여줄 페이지 개수

    const start = Math.floor((currentPage - 1) / maxPageGroupSize) * maxPageGroupSize + 1;
    const end = Math.min(start + maxPageGroupSize - 1, totalPage);

    const goToPreviousPage = () => {
        const newPage = Math.max(currentPage - 1, 1);
        setCurrentPage(newPage);
        router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${params.limit}&sort=${params.sort}`);
    };

    const goToNextPage = () => {
        const newPage = Math.min(currentPage + 1, totalPage);
        setCurrentPage(newPage);
        router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${params.limit}&sort=${params.sort}`);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
        router.push(`/announcement/universal/section/${sectionId}?page=${page}&limit=${params.limit}&sort=${params.sort}`);
    };

    // 이전 페이지 그룹으로 이동
    const goToPreviousGroupPage = () => {
        const newPage = Math.max(start - 1, 1);
        setCurrentPage(newPage);
        router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${params.limit}&sort=${params.sort}`);
    };

    // 다음 페이지 그룹으로 이동
    const goToNextGroupPage = () => {
        const newPage = Math.min(end + 1, totalPage);
        setCurrentPage(newPage);
        router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${params.limit}&sort=${params.sort}`);
    };

    const handleSortChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const newPage = currentPage
        setSortOrder(e.target.value);
        router.push(`/announcement/universal/section/${sectionId}?page=${newPage}&limit=${params.limit}&sort=${e.target.value}`);
    }

    const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/announcements/section/${sectionId}?page=${params.page}&limit=${params.limit}&sort=${params.sort}`
            );
            setSectionAnnouncement(response.data.announcementData);
            setTotalPage(response.data.totalPages);
            setTotalLength(response.data.length);
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
                <h2 className="font-bold text-xl py-4">{totalLength}개의 공지</h2>
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="p-1 rounded-2xl text-sm bg-gray-200 cursor-pointer hover:bg-blue-100 hover:text-white"
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
                    disabled={currentPage === totalPage}
                >
                    &gt;
                </button>
                <button
                    className="px-2 rounded hover:bg-gray-300"
                    onClick={goToNextGroupPage}
                    disabled={currentPage === totalPage}
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
}
