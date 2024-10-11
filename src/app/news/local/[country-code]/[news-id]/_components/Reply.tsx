"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import {useState} from "react";

interface Reply{
    "id":number,
    "replyId":number,
    "author":string,
    "content":string,
    "date":string,
    "likes":number,
    "replies":Reply[],
}

interface ReplyProps{
    reply: Reply[];
}

dayjs.extend(relativeTime)
dayjs.locale("ko")
/**
 * @Description 댓글을 렌더링하는 컴포넌트로, 각 댓글에 대한 답글을 보여주는 기능을 포함
 * @param reply Reply[] 댓글 목록을 받는 배열
 * @Author 민동현
 */
export default function Reply({reply}:ReplyProps){

    const [openReplies, setOpenReplies] = useState<{[key:string]: boolean}>({});

    const toggleReplies= (replyId:number)=>{
        setOpenReplies((prevState)=>({
            ...prevState,
            [replyId]: !prevState[replyId],
        }));
    }

    return(
        <div className="py-4">
            {reply.map((reply) => (
                <div key={reply.id}>

                    <div className="flex flex-row items-center">
                        <h1 className="font-bold">{reply.author}</h1>
                        <p className="text-xs text-gray-500 p-2">{dayjs(reply.date).fromNow()}</p>
                    </div>

                    <p className="pd-4">{reply.content}</p>

                   <p
                        className="py-2 text-xs cursor-pointer text-blue-500"
                        onClick={()=>toggleReplies(reply.replyId)}
                    >
                        답글 {reply.replies.length}
                    </p>

                    {openReplies[reply.replyId] && (
                        <div className="pl-4">
                            <Reply reply={reply.replies}/>
                        </div>
                    )}

                    <hr/>

                </div>
            ))}
        </div>
    );
}