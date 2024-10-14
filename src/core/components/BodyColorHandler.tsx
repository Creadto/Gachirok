// app/components/BodyClassHandler.tsx
'use client';

import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';


interface BodyColorHandlerProps {
font : NextFontWithVariable
}

export default function BodyColorHandler({font} : BodyColorHandlerProps) {
  const pathname = usePathname();
  
  useEffect(() => {
    // 특정 페이지에 따라 배경색 변경
    if (pathname.startsWith("/sign-up") || pathname.startsWith("/create-profile"))
      //  ||  routing 다른 조건들 활성화
     {
      document.body.className = `bg-white ${font.className}`; // 회원가입 페이지일 때 배경색 흰색
    } else {
      document.body.className = `bg-[#F6F6F6] ${font.className} `; // 그 외 페이지일 때 기본 배경색
    }
  }, [pathname]);

  return null; // 렌더링하는 UI는 없으므로 null 반환
}