import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export const AddressModal = () => {
    const [zipCode, setZipcode] = useState<string>("");
    const [roadAddress, setRoadAddress] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    const completeHandler = (data:any) =>{
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false); //추가
    }


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-6 text-black hover:text-gray-800"
          >
            &#10005;
          </button>
          <div className="text-center mb-4">
          {/* 카카오 로그인 버튼 */}
          <div className="flex flex-col gap-y-2.5 ">
            <DaumPostcode onComplete={completeHandler}></DaumPostcode>
          </div>
         
          </div>

        </div>
      </div>
    </>
  );
};
