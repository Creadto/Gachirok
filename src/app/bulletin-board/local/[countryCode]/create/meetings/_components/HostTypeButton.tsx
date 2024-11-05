import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { CoinIcon } from "@/core/components/icons/CoinIcon";
import { HeroHostIcon } from "@/core/components/icons/HeroHostIcon";
import { PackageIcon } from "@/core/components/icons/PackageIcon";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface HostTypeButtonProps {
  userData: ProfileResponse | undefined;
  setValue: UseFormSetValue<any>;
}

export const HostTypeButton = ({ userData, setValue }: HostTypeButtonProps) => {
  const [selectedHostType, setSelectedHostType] = useState("normal_host");
  const [coin, setCoin] = useState(
    userData?.purchaseProfile?.freeHosting ? 0 : -1
  );

  const purchasePackage = () => {
    if (userData?.purchaseProfile.purchaseItem.all === "day_all") {
      return "하루 무제한 패키지 이용중";
    } else if (userData?.purchaseProfile.purchaseItem.all === "week_all") {
      return "일주일 무제한 패키지 이용중";
    } else if (userData?.purchaseProfile.purchaseItem.all === "month_all") {
      return "한달 무제한 패키지 이용중";
    } else if (
      userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === "day_hosting"
    ) {
      return "하루 호스팅 패키지 이용중";
    } else if (
      userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === "week_hosting"
    ) {
      return "일주일 호스팅 패키지 이용중";
    } else if (
      userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === "month_hosting"
    ) {
      return "한달 호스팅 패키지 이용중";
    }
  };

  const packageItemSort = () => {
    if (userData?.purchaseProfile.purchaseItem.all === "day_all") {
      setValue("packageItem", "day_all");
    } else if (userData?.purchaseProfile.purchaseItem.all === "week_all") {
      setValue("packageItem", "week_all");
    } else if (userData?.purchaseProfile.purchaseItem.all === "month_all") {
      setValue("packageItem", "month_all");
    } else if (
      userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === "day_hosting"
    ) {
      setValue("packageItem", "day_hosting");
    } else if (
      userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === "week_hosting"
    ) {
      setValue("packageItem", "week_hosting");
    } else if (
      userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === "month_hosting"
    ) {
      setValue("packageItem", "month_hosting");
    } else {
      setValue("packageItem", "none");
    }
  };

  const packageItemChange = (hostType: string) => {
    if (userData?.purchaseProfile.freeHosting === true) {
      if (hostType === "normal_host") {
        setValue("packageItem", "free_hosting");
      } else if (hostType === "super_host") {
        packageItemSort();
      } else if (hostType === "hero_host") {
        packageItemSort();
      }
    } else {
      packageItemSort();
    }
  };

  const handleHostTypeChange = (hostType: string, coin: number) => {
    setSelectedHostType(hostType);
    setCoin(coin);
  };

  useEffect(() => {
    setValue("hostType", selectedHostType);
    setValue("coin", coin);
    packageItemChange(selectedHostType);
  }, [coin, selectedHostType, userData]);

  return (
    <>
      {/* 이용중인 패키지 선택 */}
      {userData?.purchaseProfile.purchaseItem.all === null &&
      userData?.purchaseProfile.purchaseItem.hosting === null ? (
        <div className="mt-[15px] bg-[#eff6ff] flex p-[15px]  rounded-lg">
          <div className="text-sm text-[#0676fc] flex">
            이용중인 패키지가 없습니다.
          </div>
          <div className="flex ml-auto">
            <PackageIcon />
          </div>
        </div>
      ) : (
        <div className="mt-[15px] bg-[#eff6ff] flex p-[15px]  rounded-lg items-center">
          <div className="text-sm text-[#0676fc]">{purchasePackage()}</div>
          <div className="flex ml-auto">
            <PackageIcon />
          </div>
        </div>
      )}

      {/* 보유 코인 표시 */}
      <div className="flex items-center justify-end gap-x-[5px] bg-[#ececec] rounded-full py-[2px] pl-[2px] pr-[10px] max-w-fit ml-auto mt-[5px]">
        <CoinIcon width={22} height={22} />
        <span className="font-semibold text-xs items-center justify-center flex my-auto">
          {userData?.purchaseProfile.coin}
        </span>
      </div>
      <div className="flex space-x-4 mt-[30px]">
        {/* 노출 종류 선택 */}

        <button
          type="button"
          key="normal_host"
          className={`relative flex-1 p-4 text-left border ${
            selectedHostType === "normal_host"
              ? "border-4 border-[#E62A2F]"
              : "border-[#eeeeee]"
          } bg-white flex flex-col rounded-[10px]`}
          onClick={() => handleHostTypeChange("normal_host", 0)}
        >
          {userData?.purchaseProfile.freeHosting ? (
            <>
              <span className="font-bold block">일반 호스트</span>
              <span className="block mt-[10px] text-xs text-[#808080]">
                기본 개설 방식이며 개설된 순서로 모임이 노출됩니다 (하루에 한번
                무료 호스팅 제공)
              </span>
              <div className="mt-[20px] flex gap-x-[5px] items-center justify-start absolute left-[15px] bottom-[20px]">
                <CoinIcon width={22} height={22} />
                <span className="font-bold text-lg">무료</span>
              </div>
            </>
          ) : (
            <>
              <span className="font-bold block">일반 호스트</span>
              <span className="block mt-[10px] text-xs text-[#808080]">
                기본 개설 방식이며 개설된 순서로 모임이 노출됩니다
              </span>
              <div className="mt-[20px] flex gap-x-[5px] items-center justify-start absolute left-[15px] bottom-[20px]">
                <CoinIcon width={22} height={22} />
                <span className="font-bold text-lg">1</span>
              </div>
            </>
          )}
        </button>

        {/* {userData?.purchaseProfile.freeHosting ? (
          <button
            type="button"
            key="normal_host"
            className={`relative flex-1 p-4 text-left border ${
              selectedHostType === "normal_host"
                ? "border-4 border-[#E62A2F]"
                : "border-[#eeeeee]"
            } bg-white flex flex-col rounded-[10px]`}
            onClick={() => handleHostTypeChange("normal_host", 0)}
          >
            <span className="font-bold block">일반 호스트</span>
            <span className="block mt-[10px] text-xs text-[#808080]">
              기본 개설 방식이며 개설된 순서로 모임이 노출됩니다 (하루에 한번
              무료 호스팅 제공)
            </span>
            <div className="mt-[20px] flex gap-x-[5px] items-center justify-start absolute left-[15px] bottom-[20px]">
              <CoinIcon width={22} height={22} />
              <span className="font-bold text-lg">무료</span>
            </div>
          </button>
        ) : (
          <button
            type="button"
            key="normal_host"
            className={`relative h-[140px] flex-1 p-4 text-left border ${
              selectedHostType === "normal_host"
                ? "border-4 border-[#E62A2F]"
                : "border-[#eeeeee]"
            } bg-white flex flex-col rounded-[10px]`}
            onClick={() => handleHostTypeChange("normal_host", -1)}
          >
            <span className="font-bold block">일반 호스트</span>
            <span className="block mt-[10px] text-xs text-[#808080]">
              기본 개설 방식이며 개설된 순서로 모임이 노출됩니다
            </span>
            <div className="mt-[20px] flex gap-x-[5px] items-center justify-start absolute left-[15px] bottom-[20px]">
              <CoinIcon width={22} height={22} />
              <span className="font-bold text-lg">1</span>
            </div>
          </button>
        )} */}

        <button
          type="button"
          key="super_host"
          className={`relative h-[140px] flex-1 p-4 text-left border ${
            selectedHostType === "super_host"
              ? "border-4 border-[#E62A2F]"
              : "border-[#ffd2bf]"
          } bg-[#fff3ee] flex flex-col rounded-[10px]`}
          onClick={() => handleHostTypeChange("super_host", -2)}
        >
          <span className="font-bold block">슈퍼 호스트</span>
          <span className="block mt-[10px] text-xs a">
            일반 호스트보다 상위에 노출됩니다.
          </span>
          <div className="mt-[20px] flex gap-x-[5px] items-center justify-start absolute left-[15px] bottom-[20px]">
            <CoinIcon width={22} height={22} />
            <span className="font-bold text-lg">2</span>
          </div>
        </button>

        <button
          type="button"
          key="hero_host"
          className={`relative flex-1 p-4 text-left border ${
            selectedHostType === "hero_host"
              ? "border-4 border-[#E62A2F]"
              : "border-[#ac15e8]"
          } bg-gradient-to-br from-[rgba(255,220,254,0.5)] to-[rgba(230,148,255,0.5)] flex flex-col rounded-[10px]`}
          onClick={() => handleHostTypeChange("hero_host", -5)}
        >
          <div className="flex gap-x-[5px] items-center justify-start">
            <HeroHostIcon />
            <span className="font-bold block">히어로 호스트</span>
          </div>
          <span className="block mt-[10px] text-xs ">
            슈퍼 호스트보다 상위에 노출되며, 개설과 동시에 같은 지역의
            사용자들에게 모임을 알립니다.
          </span>
          <div className="mt-[20px] flex gap-x-[5px] items-center justify-start absolute left-[15px] bottom-[20px]">
            <CoinIcon width={22} height={22} />
            <span className="font-bold text-lg">5</span>
          </div>
        </button>
      </div>
    </>
  );
};
