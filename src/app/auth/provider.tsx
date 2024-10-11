"use client"

import { SessionProvider } from "next-auth/react"

type Props =({
    children: React.ReactNode
})

/**
 * @Description Session을 사용하기 위해 SessionProvider으로 감싸는 세팅
 * @author 김영서
 **/
export const AuthProvider = ({children}: Props) => {
return <SessionProvider>{children}</SessionProvider>
}