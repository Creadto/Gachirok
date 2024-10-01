import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

/**
 * @Description SNS로그인을 통해 자체 API로 response를 요청한후, Session사용을 가능하게끔 하는 function
 * @author 김영서
 **/
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
    async signIn({ account }: any) {
      if (account) {
        const { access_token, provider} =
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
          account.signedUpUser = authResponse.data.signedUpUser;
          console.log("sex", authResponse.data.signedUpUser);

          console.log("api auth", authResponse.data);
        } catch (error) {
          console.error("Error during signIn:", error);
        }
      }
      return true;
    },
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account) {
        //account에 저장된 기존의 가치가 api에서 받아온 accesstoken을 token.accessToken에 저장
        token.accessToken = account.access_token;
        token.signedUpUser = account.signedUpUser;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token?.accessToken) {
        //최종적으로 session의 accessToken에 가치가api에서 받아온 accessToken저장
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.signedUpUser = token.signedUpUser;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
