"use client";

import {useState} from "react";
import axios from "axios";

interface ReplyInputProps {
    type:string;
    parentId:string;
}

/**
 * @Description 댓글 입력 컴포넌트
 * @Author 민동현
 */
export default function ReplyInput({type,parentId}: ReplyInputProps) {

    const [replyContent, setReplyContent] = useState("");
    // const newsId = params['news-id'];

    const onClick = async(e:React.MouseEvent<HTMLElement,MouseEvent>)=>{
        e.preventDefault();

        if(replyContent === ""){
            alert("내용을 입력해주세요");
            return;
        }
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/${parentId}/reply`,{
                id: 31,
                content:"asdasdasdas",
                author:"mindong"
            });
            alert(response.data.message);
        }
        catch (error) {
            console.log(error);
        }

    }
    return(
        <div>
            <form className="flex flex-row items-center">
                <input
                    placeholder="댓글을 입력해주세요"
                    className="bg-gray-200 size-11/12 p-3"
                    value={replyContent}
                    onChange={(e)=>setReplyContent(e.target.value)}
                />
                <div className="pl-4">
                    <button
                        className="bg-gray-200 text-white p-2 hover:bg-blue-600 transition"
                        onClick={onClick}
                    >등록</button>
                </div>
            </form>
        </div>
    );
}