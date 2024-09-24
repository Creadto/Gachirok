import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    KakaoProvider({
      name: "kakao",
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, user, profile }: any) {
      if (account) {
        const { access_token, provider, refresh_token, providerAccountId } =
          account;
        try {
          const authResponse = await axios.post(
            "https://dev.gachiga.creadto.com/api/v1/auth/login",
            {
              provider,
              oauthToken: access_token,
            }
          );

          //account의 accessToken에 가치가 api에서 받아온 accessToken저장
          account.access_token = authResponse.data.accessToken;
          if (authResponse.data.signedUpUser === false) {
            return "/sign-up"; // 클라이언트 측에서 이 경로로 리다이렉트
          }

          console.log("api auth", authResponse.data);
          return authResponse.data.signedUpUser === true;
        } catch (error) {
          console.error("Error during signIn:", error);
        }
      }
      return true;
    },
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      account: any;
    }) {
      if (account) {
        //account에 저장된 기존의 가치가 api에서 받아온 accesstoken을 token.accessToken에 저장
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token?.accessToken) {
        //최종적으로 session의 accessToken에 가치가api에서 받아온 accessToken저장
        session.accessToken = token.accessToken;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
