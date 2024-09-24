"use client"


import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import React, { useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


type Props= {
    children: React.ReactNode
}


export default function ReactQueryProvider({children}: Props) {
    const[client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false, //윈도우가 다시 포커스 되었을 떄 데이터를 fetch
                    refetchOnMount: false, //데이터가 stale 상태면 컴포넌트가 마운트될 때 refetch
                    retry: 1, //API 요청 실패시 재시도 하는 옵션(설정값만큼 재시도)

                }
            }
        })
    );

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        
      );
}