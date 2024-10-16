"use client";
import { countryStore } from "@/core/store/country-store";
import { usePathname, useRouter } from "next/navigation";
import {
  ActiveAnnouncementIcon,
  AnnouncementIcon,
} from "../icons/side-bar/AnnouncementIcon";
import {
  ActiveBulletinBoardIcon,
  BulletinBoardIcon,
} from "../icons/side-bar/BulletinBoardIcon";
import {
  ActiveFleaMarketIcon,
  FleaMarketIcon,
} from "../icons/side-bar/FleaMarketIcon";
import { ActiveGachigaIcon, GachigaIcon } from "../icons/side-bar/GachigaIcon";
import { ActiveHomeIcon, HomeIcon } from "../icons/side-bar/HomeIcon";
import { ActiveNewsIcon, NewsIcon } from "../icons/side-bar/NewsIcon";
import {
  ActiveRealEstateIcon,
  RealEstateIcon,
} from "../icons/side-bar/RealEstateIcon";
import { ActiveRecruitIcon, RecruitIcon } from "../icons/side-bar/RecruitIcon";
import { ActiveShopIcon, ShopIcon } from "../icons/side-bar/ShopIcon";
import CountrySelector from "./CountrySelector";
import { useEffect, useState } from "react";

import SidebarItem from "./SidebarItem";
import { CountryList } from "@/core/data/CountryList";
/**
 * @Description 왼쪽 Navigation Bar
 * @author 김영서
 **/
const Sidebar = () => {
  const { country } = countryStore();
  const router = useRouter();
  const pathname = usePathname();

  const [activeItems, setActiveItems] = useState({
    home: false,
    universalNews: false,
    universalAnnouncement: false,
    universalBulletinBoard: false,
    localNews: false,
    localAnnouncement: false,
    localGachiga: false,
    localBulletinBoard: false,
    localRealEstate: false,
    localFleaMarket: false,
    localRecruit: false,
    localShop: false,
  });
  const countryList = CountryList;

  useEffect(() => {
    setActiveItems({
      home: pathname === `/${country}`,
      universalNews:
        pathname.startsWith("/news") && !pathname.includes("/local"),
      universalAnnouncement:
        pathname.startsWith("/announcement") && !pathname.includes("/local"),
      universalBulletinBoard:
        pathname.startsWith("/bulletin-board") && !pathname.includes("/local"),
      localNews: pathname.includes("/news/local"),
      localAnnouncement: pathname.includes("/announcement/local"),
      localGachiga: pathname.includes("/gachiga/"),
      localBulletinBoard: pathname.startsWith("/bulletin-board/local/"),
      localRealEstate: pathname.includes("/real-estate/local"),
      localFleaMarket: pathname.includes("/flea-market/local"),
      localRecruit: pathname.includes("/recruit/local"),
      localShop: pathname.includes("/shop/local"),
    });
  }, [router, pathname]);

  if (pathname.startsWith("/sign-up") || pathname.startsWith("/create-profile")) return null;
  else {
    return (
      <aside className="ml-[1%] w-[230px] mt-[100px] h-full  bg-white rounded-[15px] z-40 border-[#EEEEEE] border-2">
        {/* 국가선택 */}
        <div className="w-full  h-[72px] mt-[5px] relative shadow-sm">
          <div className="flex flex-col w-[190px] h-[37px] absolute top-[15px] left-[20px]">
            <span className="block h-[18px] w-full text-[#A3A3A3] text-[13px]">
              현재국가
            </span>
            <div className="mt-[5px]  h-[22px] w-full flex flex-row space-x-[10px]">
              <div className="w-[36px] h-full">
                {country
                  ? countryList.find((countries) => countries.code === country)
                      ?.icon
                  : ""}
              </div>
              <div className=" w-full h-full relative">
                <CountrySelector />
              </div>
            </div>
          </div>
        </div>

        {/* Home */}
        <div
          className={`flex items-center text-start ml-[20px] mt-[6px] w-full h-[16px] text-[12px] ${
            activeItems.home ? "text-[#E62A2F]" : "text-[#808080]"
          }  mb-[6px]`}
        >
          Main
        </div>
        <div className="h-[49px] w-full shadow-sm">
          <SidebarItem
            isActive={activeItems.home}
            onClick={() => router.push(`/${country}`)}
            activeIcon={<ActiveHomeIcon />}
            inactiveIcon={<HomeIcon />}
            label="Home"
          />
        </div>

        {/* Universal */}
        <div
          className={`flex items-center text-start  ml-[20px] mt-[6px] w-full h-[16px] text-[12px] ${
            activeItems.universalAnnouncement ||
            activeItems.universalBulletinBoard ||
            activeItems.universalNews
              ? "text-[#E62A2F]"
              : "text-[#808080]"
          }  mb-[6px]`}
        >
          Universal
        </div>

        <div className="w-full h-[137px] shadow-sm">
          <div className=" h-[132px]">
            {/* News */}
            <SidebarItem
              isActive={activeItems.universalNews}
              onClick={() => router.push("/news")}
              activeIcon={<ActiveNewsIcon />}
              inactiveIcon={<NewsIcon />}
              label="News"
            />

            {/* Announcement */}
            <SidebarItem
              isActive={activeItems.universalAnnouncement}
              onClick={() => router.push("/announcement")}
              activeIcon={<ActiveAnnouncementIcon />}
              inactiveIcon={<AnnouncementIcon />}
              label="Announcement"
            />

            {/* Bulletin Board */}
            <SidebarItem
              isActive={activeItems.universalBulletinBoard}
              onClick={() => router.push("/bulletin-board")}
              activeIcon={<ActiveBulletinBoardIcon />}
              inactiveIcon={<BulletinBoardIcon />}
              label="Bulletin Board"
            />
          </div>
        </div>

        {/* Local */}
        <div
          className={`flex items-center text-start mt-[6px] w-full h-[16px] text-[12px] ml-[20px] ${
            activeItems.localAnnouncement ||
            activeItems.localBulletinBoard ||
            activeItems.localFleaMarket ||
            activeItems.localGachiga ||
            activeItems.localNews ||
            activeItems.localRealEstate ||
            activeItems.localRecruit ||
            activeItems.localShop
              ? "text-[#E62A2F]"
              : "text-[#808080]"
          }  mb-[6px]`}
        >
          Local
        </div>

        <div className="w-full h-[365px] shadow-sm">
          <div className=" h-[132px]">
            {/* News */}
            <SidebarItem
              isActive={activeItems.localNews}
              onClick={() => router.push(`/news/local/${country}`)}
              activeIcon={<ActiveNewsIcon />}
              inactiveIcon={<NewsIcon />}
              label="News"
            />

            {/* Announcement */}
            <SidebarItem
              isActive={activeItems.localAnnouncement}
              onClick={() => router.push(`/announcement/local/${country}`)}
              activeIcon={<ActiveAnnouncementIcon />}
              inactiveIcon={<AnnouncementIcon />}
              label="Announcement"
            />

            {/* Gachiga */}
            <SidebarItem
              isActive={activeItems.localGachiga}
              onClick={() => router.push(`/gachiga/local/${country}`)}
              activeIcon={<ActiveGachigaIcon />}
              inactiveIcon={<GachigaIcon />}
              label="Gachiga"
            />

            {/* Bulletin Board */}
            <SidebarItem
              isActive={activeItems.localBulletinBoard}
              onClick={() => router.push(`/bulletin-board/local/${country}`)}
              activeIcon={<ActiveBulletinBoardIcon />}
              inactiveIcon={<BulletinBoardIcon />}
              label="Bulletin Board"
            />

            {/* Real Estate */}
            <SidebarItem
              isActive={activeItems.localRealEstate}
              onClick={() => router.push(`/real-estate/local/${country}`)}
              activeIcon={<ActiveRealEstateIcon />}
              inactiveIcon={<RealEstateIcon />}
              label="Real Estate"
            />

            {/* Flea Market */}
            <SidebarItem
              isActive={activeItems.localFleaMarket}
              onClick={() => router.push(`/flea-market/local/${country}`)}
              activeIcon={<ActiveFleaMarketIcon />}
              inactiveIcon={<FleaMarketIcon />}
              label="Flea Market"
            />

            {/* Recruit */}
            <SidebarItem
              isActive={activeItems.localRecruit}
              onClick={() => router.push(`/recruit/local/${country}`)}
              activeIcon={<ActiveRecruitIcon />}
              inactiveIcon={<RecruitIcon />}
              label="Recruit"
            />

            {/* Shop */}
            <SidebarItem
              isActive={activeItems.localShop}
              onClick={() => router.push(`/shop/local/${country}`)}
              activeIcon={<ActiveShopIcon />}
              inactiveIcon={<ShopIcon />}
              label="Shop"
            />
          </div>
        </div>
        <span className="flex mt-[15px] mx-[20px] whitespace-nowrap text-[11px] box-content mb-[20px] text-[#A3A3A3]">
          © 2024 Creadto. All rights reserved.
        </span>
      </aside>
    );
  }
};

export default Sidebar;
