"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import Coin from "@/app/payment/_components/Coin";
import AllinonePackage from "@/app/payment/_components/AllinonePackage";
import GuestPackage from "@/app/payment/_components/GuestPackage";
import GachiAskPackage from "@/app/payment/_components/GachiAskPackage";
import HostingPackage from "@/app/payment/_components/HostingPackage";
import CoinBalance from "@/app/payment/_components/CoinBalance";

export default function PaymentPage(){

    const [userId, setUserId] = useState<string>();
    const {data: session} = useSession();
    const [coin, setCoin] = useState<number>();

    const [all,setAll] = useState<string>();
    const [guest,setGuest] = useState<string>();
    const [inquiry,setInquiry] = useState<string>();
    const [hosting,setHosting] = useState<string>();


    const getUserData = async () => {
        if (session?.accessToken) {
            try{
                const response = await axios.get("/api/users", {
                    headers:{
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                setUserId((response.data.userId).toString());
            }
            catch (error) {
                console.error("Error getUserData:", error);
            }
        }
    }
    const getCoinData = async () => { // 코인 개수 가져오기
        if (session?.accessToken) {
            try {
                const response = await axios.get("/api/purchases", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                setCoin(response.data.coin);
            } catch (error) {
                console.error("Error getCoin data:", error);
            }
        }
    }

    const getSubscribe = async ()=>{
        if(session?.accessToken){
            try{
                const response = await axios.get("/api/purchases", {
                    headers:{
                        Authorization: `Bearer ${session.accessToken}`,
                    }
                })
                setAll(response.data.purchaseItem.allExpirationDateTime);
                setGuest(response.data.purchaseItem.guestExpirationDateTime);
                setInquiry(response.data.purchaseItem.inquiryExpirationDateTime);
                setHosting(response.data.purchaseItem.hostingExpirationDateTime);
            }
            catch(error){
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getCoinData();
        getUserData();
        getSubscribe();
    },[session])


    return(
        <div className="w-full flex flex-col items-center justify-center">

            <div className="flex justify-center mb-[50px] text-[50px] font-bold text-gray-800">
                아이템 상점
            </div>

            {/*유저 코인 잔고*/}
            <div className="mb-4 w-full max-w-[20%]">
                <CoinBalance coin={coin}/>
            </div>

            {/*구매 아이템 목록*/}
            <div className="flex flex-row w-full">
                <Coin userId={userId}/>
                <AllinonePackage subscribeTime={all}/>
                <GuestPackage subscribeTime={guest} allTime={all}/>
                <GachiAskPackage subscribeTime={inquiry} allTime={all}/>
                <HostingPackage subscribeTime={hosting} allTime={all}/>
            </div>

        </div>
    );
}
