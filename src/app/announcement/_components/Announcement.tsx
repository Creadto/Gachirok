"use client";

import {useParams, useRouter} from "next/navigation";
import Image from "next/image";

interface AnnouncementProps {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    imageUrl: string;
    likes: number;
    popular: number;
    comments: number;
    regionType: string;
}

/**
 *
 * @Description 공지 사항 목록을 표시하기 위한 대략적인 정보(제목, 본문...)를 담고있는 공지 컴포넌트
 * @Author 민동현
 */

export default function Announcement({announcement}: { announcement: AnnouncementProps }) {

    const params = useParams();
    const router = useRouter();

    const countryCode = params['country-code']; // local 일 경우

    const handleClick = () => {
        if (announcement.regionType === 'local') {
            router.push(`/announcement/local/${countryCode}/${announcement.id}`)
        } else {
            router.push(`/announcement/universal/${announcement.id}`)
        }
    }

    return (
        <div
            className="w-[670px] h-[140px] flex flex-row p-[15px] cursor-pointer justify-between border rounded-2xl bg-[#FFF]">
            {announcement.imageUrl === "" ?
                <div className="h-[90px] flex flex-col justify-between" onClick={handleClick}>
                    <div className="mb-[10px]">
                        <div className="h-[20px] text-[11px] text-[#e62a2f] rounded-[2px] bg-[#ffe9ea] px-[6px] py-[3px] mb-[5px] inline-block justify-center items-center">{announcement.category}</div>
                        <div className="w-[640px]">
                            <h3 className="text-[15px] font-bold line-clamp-1 mb-[2px]">{announcement.title}</h3>
                            <p className="text-[13px] text-[#a3a3a3] line-clamp-2">{announcement.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                        <span>{announcement.date}</span>
                        <div className="flex flex-row gap-[5px]">
                            <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.846 6.619 9.81 4.583a3.97 3.97 0 0 0-5.612 0L2.163 6.619a1.078 1.078 0 0 0 0 1.532l2.035 2.036a3.97 3.97 0 0 0 5.612 0l2.036-2.036a1.092 1.092 0 0 0 0-1.532z"
                                        stroke="#A3A3A3"/>
                                    <path d="M7 9.49a2.105 2.105 0 1 0 0-4.21 2.105 2.105 0 0 0 0 4.21z"
                                          stroke="#A3A3A3"/>
                                </svg>
                                <p>{announcement.popular}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m4.932 6.621 1.845-4.086c.367 0 .719.144.979.4.26.254.405.6.405.962v1.816h2.611a.935.935 0 0 1 .707.312.905.905 0 0 1 .216.732l-.637 4.086a.905.905 0 0 1-.315.556.931.931 0 0 1-.608.216H4.932m0-4.994v4.994m0-4.994H3.548a.93.93 0 0 0-.653.266.9.9 0 0 0-.27.642v3.178a.9.9 0 0 0 .27.642.93.93 0 0 0 .653.266h1.384"
                                        stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>{announcement.likes}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#b5c86sn4ua)">
                                        <path
                                            d="M11.977 7.312c0-2.193-2.139-3.972-4.775-3.972-2.637 0-4.776 1.776-4.776 3.972a4.173 4.173 0 0 0 3.541 3.83v1.599l2.297-1.569a4.213 4.213 0 0 0 3.719-3.86h-.006z"
                                            stroke="#A3A3A3" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="b5c86sn4ua">
                                            <path fill="#fff" transform="translate(1 1.5)" d="M0 0h12.406v12.22H0z"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{announcement.comments}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex flex-col justify-between" onClick={handleClick}>
                    <div className="mb-[10px]">
                        <p className="h-[20px] text-[11px] text-[#e62a2f] rounded-[2px] bg-[#ffe9ea] px-[6px] py-[3px] mb-[5px] inline-block justify-center items-center">{announcement.category}</p>
                        <div className="w-[515px]">
                            <h3 className="text-[15px] font-bold line-clamp-1 mb-[2px]">{announcement.title}</h3>
                            <p className="text-[13px] text-[#a3a3a3] line-clamp-2">{announcement.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                        <span>{announcement.date}</span>
                        <div className="flex flex-row gap-[5px]">
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.846 6.619 9.81 4.583a3.97 3.97 0 0 0-5.612 0L2.163 6.619a1.078 1.078 0 0 0 0 1.532l2.035 2.036a3.97 3.97 0 0 0 5.612 0l2.036-2.036a1.092 1.092 0 0 0 0-1.532z"
                                        stroke="#A3A3A3"/>
                                    <path d="M7 9.49a2.105 2.105 0 1 0 0-4.21 2.105 2.105 0 0 0 0 4.21z"
                                          stroke="#A3A3A3"/>
                                </svg>
                                <p>{announcement.popular}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m4.932 6.621 1.845-4.086c.367 0 .719.144.979.4.26.254.405.6.405.962v1.816h2.611a.935.935 0 0 1 .707.312.905.905 0 0 1 .216.732l-.637 4.086a.905.905 0 0 1-.315.556.931.931 0 0 1-.608.216H4.932m0-4.994v4.994m0-4.994H3.548a.93.93 0 0 0-.653.266.9.9 0 0 0-.27.642v3.178a.9.9 0 0 0 .27.642.93.93 0 0 0 .653.266h1.384"
                                        stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>{announcement.likes}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#b5c86sn4ua)">
                                        <path
                                            d="M11.977 7.312c0-2.193-2.139-3.972-4.775-3.972-2.637 0-4.776 1.776-4.776 3.972a4.173 4.173 0 0 0 3.541 3.83v1.599l2.297-1.569a4.213 4.213 0 0 0 3.719-3.86h-.006z"
                                            stroke="#A3A3A3" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="b5c86sn4ua">
                                            <path fill="#fff" transform="translate(1 1.5)" d="M0 0h12.406v12.22H0z"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{announcement.comments}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {announcement.imageUrl === "" ?
                null :
                <div className="w-[110px] h-[110px] relative">
                    <Image
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        fill
                        // objectFit='contain' // 원본 비율 유지
                        className="rounded-[8px]"
                    />
                </div>
            }
        </div>
    );
}