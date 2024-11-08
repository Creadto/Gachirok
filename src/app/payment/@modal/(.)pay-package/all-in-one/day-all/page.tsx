"use client";
import {useSession} from "next-auth/react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function AllInOneModalPage() {

    const router = useRouter();
    const {data:session} = useSession();

    const handlePurchase = async()=>{
        try {
            if (session?.accessToken) {
                try {
                    const response = await axios.post("/api/purchases", {
                            packageItem:"day_all",
                            coin: -15
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${session.accessToken}`,
                            }
                        })
                    alert("구매되었습니다")
                    router.back();
                } catch (e) {
                    console.log(e.message);
                }
            } else { // 토큰이 없을 경우
                console.log("No tokens");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-[100vw] h-[100vw] flex justify-center items-center absolute z-10 inset-0 bg-black/40">
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[620px] border border-solid border-[#eee] rounded-[15px] flex flex-col bg-[#fff]">
                하루 무제한 구매하시겠습니까?
                <button
                    onClick={handlePurchase}
                >
                    예
                </button>
                <button
                    onClick={()=>{router.back()}}
                >
                    아니오
                </button>
            </div>
        </div>
    );
}