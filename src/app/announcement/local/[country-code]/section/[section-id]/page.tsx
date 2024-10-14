"use client";

import {AnNumberToCategory, Category} from "@/app/announcement/utils/Category";
import AnnouncementCategoryButton from "@/app/announcement/_components/AnnouncementCategoryButton";
import SectionAnnouncement from "@/app/announcement/_components/SectionAnnouncement";

interface AnnouncePageProps{
    params: {'section-id':string};
    searchParams: {[key:string]:string};
}


export default function LocalAnnouncementSectionPage(props:AnnouncePageProps){


    const { params: {'section-id': categoryId}} = props;
    const currentCategory = AnNumberToCategory[categoryId];

    const { searchParams: {page}} = props;  // 현재 페이지
    const { searchParams: {limit}} =props;  // 페이지에서 보여줄 공지 개수
    const { searchParams: {sort}} = props;

    return(
        <section className="py-4 px-32">
            <div className="py-4 flex">
                <h1 className="pr-2 font-bold text-3xl">공지사항</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Local</p>
            </div>
            <div>
                <div className="flex flex-row">
                    {Category.map((section) => (
                        <div key={section}>
                            <AnnouncementCategoryButton section={section} currentSection={currentCategory} regionType="local"/>
                        </div>
                    ))}
                </div>
                <SectionAnnouncement section={currentCategory} page={page} limit={limit} sort={sort} regionType="local"/>
            </div>
        </section>
    );
}