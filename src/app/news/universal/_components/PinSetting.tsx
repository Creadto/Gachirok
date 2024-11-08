import Link from "next/link";

export default function PinSetting() {

    return (
        <Link
            href={"/news/universal/pinSetting"}
            className="flex flex-row gap-[5px] items-center border rounded-[50px] px-[7px] py-[3px] text-[#FFFFFF] bg-[#000000] cursor-pointer hover:text-red-400"
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.548 12.768a.498.498 0 0 1-.116-.685l2.84-4.937a.496.496 0 0 1 .65-.244.499.499 0 0 1 .115.685l-2.84 4.938a.495.495 0 0 1-.65.243"
                    fill="#fff"/>
                <path
                    d="m8.75 8.292 1.626-3.605.943.545.615-1.065L6.78 1.191l-.616 1.067.943.544-2.308 3.21a2.62 2.62 0 0 0-2.733 1.266l6.953 4.014a2.622 2.622 0 0 0-.27-3"
                    fill="#fff"/>
            </svg>
            <div className="text-[15px]">
                핀 설정
            </div>
        </Link>
    );
}