"use client";

import {AnNumberToCategory, Category} from "@/app/announcement/utils/Category";
import AnnouncementCategoryButton from "@/app/announcement/_components/AnnouncementCategoryButton";
import SectionAnnouncement from "@/app/announcement/_components/SectionAnnouncement";

interface AnnouncePageProps {
    params: { 'section-id': string };
    searchParams: { [key: string]: string };
}

/**
 *
 * @Description Universal 공지사항을 섹션별(전체,입국정보,이용안내, 업데이트, 이벤트)로 보여주는 페이지 컴포넌트
 * @Author 민동현
 */


export default function UniversalAnnouncementSectionPage(props: AnnouncePageProps) {


    const {params: {'section-id': categoryId}} = props;
    const currentCategory = AnNumberToCategory[categoryId];

    const {searchParams: {page}} = props;  // 현재 페이지
    const {searchParams: {limit}} = props;  // 페이지에서 보여줄 공지 개수
    const {searchParams: {sort}} = props;

    return (
        <div className="mt-[1.5%] ml-[9.3%] mr-[9.3%] min-w-[1460px] max-w-[1460px] overflow-x-auto flex flex-col">
            <section className="mb-[20px] px-[50px] flex flex-row items-center gap-[5px] max-w-[318px] min-w-[318px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#0baikn50oa)">
                        <circle cx="15" cy="15" r="15" fill="#FFE9EA"/>
                        <path
                            d="M13.969 9.719H11.583a3.6 3.6 0 0 0-2.516 1.02 3.615 3.615 0 0 0-1.123 2.535 3.633 3.633 0 0 0 .907 2.638c.637.73 1.525 1.17 2.545 1.235h2.573V9.72zM20.89 7.81a.64.64 0 0 0-.551-.085l-5.155 1.75v7.905l5.164 1.722a.713.713 0 0 0 .196.028.608.608 0 0 0 .608-.608V8.305a.608.608 0 0 0-.252-.495h-.01zM15.083 18.299a.617.617 0 0 0-.43-.178h-3.135a.617.617 0 0 0-.43.178.617.617 0 0 0-.178.43v2.966c0 .337.28.608.618.608h3.124a.607.607 0 0 0 .609-.608v-2.966a.617.617 0 0 0-.178-.43z"
                            fill="#E62A2F"/>
                    </g>
                    <defs>
                        <clipPath id="0baikn50oa">
                            <path fill="#fff" d="M0 0h30v30H0z"/>
                        </clipPath>
                    </defs>
                </svg>
                <h1 className="h-[30px] text-[22px] font-bold flex items-center justify-center">공지사항</h1>
                <p className="text-[13px] text-[#808080] px-[7px] py-[3px] bg-[#ddd] rounded-[4px]">Universal</p>
            </section>
            <section className="flex flex-row gap-[5px] px-[50px] mb-[20px]">
                {Category.map((section) => (
                    <div key={section}>
                        <AnnouncementCategoryButton section={section} currentSection={currentCategory}
                                                    regionType="universal"/>
                    </div>
                ))}
            </section>
            <section className="px-[50px]">
                <SectionAnnouncement section={currentCategory} page={page} limit={limit} sort={sort}
                                     regionType="universal"/>
            </section>
        </div>
);
}