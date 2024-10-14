import { CheckIcon } from "@/core/components/icons/create-profile/CheckIcon";
import { NoCheckIcon } from "@/core/components/icons/create-profile/NoCheckIcon";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  useFormContext,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface NicknameFormProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  label: string;
  name: string;
  required?: boolean;
  errors: FieldErrors;
  placeholder: string;
  onNicknameCheck: (nickname: string) => void;
  nicknameAvailable: boolean | null;
  setNicknameAvailable: (value: boolean | null) => void;
}

/**
 * @Description 프로필 신규 생성의 Nickname 생성
 * @author 김영서
 **/
const NicknameForm: React.FC<NicknameFormProps> = ({
  register,
  label,
  name,
  required,
  errors,
  placeholder,
  onNicknameCheck,
  watch,
  nicknameAvailable,
  setNicknameAvailable
}) => {
  const nicknameValue = watch(name);
  const [isChecking, setIsChecking] = useState(false);

  const handleNicknameCheck = () => {
    if (nicknameValue) {
      setIsChecking(true);
      console.log("nickname", nicknameValue);
      onNicknameCheck(nicknameValue);
    } else {
      alert("닉네임을 입력해주세요");
    }
  };

  useEffect(() => {
    setNicknameAvailable(null); // 닉네임이 변경되면 중복 확인 버튼 다시 활성화
  }, [nicknameValue, setNicknameAvailable]);

  useEffect(() => {
    if (nicknameAvailable !== null) {
      setIsChecking(false);
    }
  }, [nicknameAvailable]);

  return (
    <label className="block mt-[40px] text-[13px] text-[#808080]">
      {label}
      <div className="mt-[10px] flex flex-row relative w-[700px] h-[50px]  border border-gray-300 rounded-md shadow-sm">
        <input
          type="text"
          {...register(name, { required })}
          placeholder={placeholder}
          className="w-full h-full block focus:ring focus:ring-opacity-50 text-black text-[14px] pl-[15px] bg-[#F6F6F6]"
        />
        {nicknameAvailable === null ? (
          <button
            className="absolute right-[32px] top-[11px] w-[58px] h-[28px] bg-black text-whiterounded-[2px] text-white"
            onClick={handleNicknameCheck}
            disabled={isChecking}
          >
            중복확인
          </button>
        ) : nicknameAvailable === true ? (
          <div className="absolute right-[32px] top-[17px] flex gap-x-[5px] justify-center items-center">
            <span className="text-[#0676FC] text-[12px]">사용가능</span>
            <CheckIcon />
          </div>
        ) : (
          <div className="absolute right-[32px] top-[17px] flex gap-x-[5px] justify-center items-center">
            <span className="text-[#FF006F] text-[12px]">사용불가</span>
            <NoCheckIcon />
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="text-red-500">닉네임은 필수항목입니다.</span>
      )}
    </label>
  );
};

export default NicknameForm;
