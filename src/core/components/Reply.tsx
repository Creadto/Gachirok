"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import Image from "next/image";
import { useState } from "react";
import ReplyInput from "@/core/components/ReplyInput";

interface Reply {
    id: number;
    replyId: number;
    author: string;
    content: string;
    date: string;
    likes: number;
    replies: Reply[];
}

interface ReplyProps {
    reply: Reply[];
    identity: string;
}

dayjs.extend(relativeTime);
dayjs.locale("ko");

/**
 * @Description 댓글을 렌더링하는 컴포넌트로, 각 댓글에 대한 답글을 보여주는 기능을 포함
 * @param reply Reply[] 댓글 목록을 받는 배열
 * @Author 민동현
 */

export default function Reply({ reply, identity }: ReplyProps) {
    // 각 댓글의 답글 입력창 표시 상태를 저장하는 배열
    const [showReplyInput, setShowReplyInput] = useState<boolean[]>(Array(reply.length).fill(false));

    const handleClickReply = (index: number) => {

        if(showReplyInput[index]){
            setShowReplyInput(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
        else{ // 입력창을 새로 여는 경우 다른 열려 있는 입력창을 닫기 위해
            setShowReplyInput(Array(reply.length).fill(false).map((_,i)=> i === index));
        }
    };

    return (
        <div className="w-full">
            {reply.map((replyItem, index) => (
                <div key={replyItem.id} className="flex flex-row">
                    <div className="w-[34px] h-[34px] relative mr-[10px] flex-shrink-0">
                        <Image
                            src="/images/haylein.jpeg"
                            alt={replyItem.author}
                            fill
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                        {/* 댓글 작성자 및 작성 시간 */}
                        <div className="flex flex-row items-center">
                            <h1 className="text-[16px]">{replyItem.author}</h1>
                            <Image
                                src="/images/interests&expertises/resident-logo.svg"
                                alt="로고"
                                width={16}
                                height={16}
                                className="py-[2px] pl-[2px]"
                            />
                        </div>

                        {/* 댓글 내용 */}
                        <p className="text-[15px] mb-[10px]">{replyItem.content}</p>

                        {/* 답글 토글 버튼 */}
                        <div className="flex flex-row items-center text-[#a3a3a3] text-[12px] mb-[15px]">
                            <p className="mr-[7px]">{dayjs(replyItem.date).fromNow()}</p>
                            {identity === "parent" ? (
                                <>
                                    <p className="mr-[7px]">&#183;</p>
                                    <p className="cursor-pointer hover:underline" onClick={() => handleClickReply(index)}>답글달기</p>
                                </>
                            ) : null}
                        </div>
                        <div>
                            {showReplyInput[index] ? (
                                <div>
                                    <ReplyInput type="news" parentId={replyItem.id} />
                                </div>
                            ) : null}
                        </div>

                        {/* 하위 답글 표시 */}
                        <div className="">
                            <Reply reply={replyItem.replies} identity="child" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
