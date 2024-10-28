/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "gachiga-dev.s3.ap-northeast-2.amazonaws.com",
      "gachiga.s3.ap-northeast-2.amazonaws.com",
    ], // S3 도메인 추가
  },
  async rewrites() {
    return [
      // AUTH
      {
        source: "/api/auth/login",
        destination: "https://dev.gachiga.creadto.com/api/v1/auth/login",
      },

      // PROFILES
      {
        source: "/api/profiles",
        destination: "https://dev.gachiga.creadto.com/api/v1/profiles",
        //CORS해결하는 방법 ->CORS문제가 발생하는 곳에서 source의 코드를 destination에 해당하는 URL로 우회 요청함
      },
      {
        // source에서 쿼리 파라미터를 유지한 채로 destination으로 전달
        source: "/api/profiles/check-nickname",
        destination:"https://dev.gachiga.creadto.com/api/v1/profiles/check-nickname", // 쿼리 파라미터는 그대로 전달됨
      },
      {
        source: "/api/profiles2/:userId",
        destination: "https://dev.gachiga.creadto.com/api/v2/profiles/:userId",
      },

      //USERS
      {
        source: "/api/users",
        destination: "https://dev.gachiga.creadto.com/api/v1/users",
      },

      //MEETINGS
      {
        source: "/api/meetings",
        destination: "https://dev.gachiga.creadto.com/api/v1/meetings",
      },
      {
        // 버전 2로 요청
        source: "/api/meetings2",
        destination: "https://dev.gachiga.creadto.com/api/v2/meetings",
      },
      {
        source: "/api/meetings/:meetingId",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId",
      },
      {
        source: "/api/meetings/host",
        destination: "https://dev.gachiga.creadto.com/api/v1/meetings/host",
      },
      {
        source: "/api/meetings/:meetingId/bookmark",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/bookmark",
      },
      {
        source: "/api/meetings/:meetingId/hosts/:newHostId",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/hosts/:newHostId",
      },
      {
        source: "/api/meetings/:meetingId/hosts/:newHostId",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/hosts/:newHostId",
      },
      {
        source: "/api/meetings/:meetingId/hosts/leave",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/hosts/leave",
      },

      // GUESTS
      {
        source: "/api/meetings/:meetingId/guests",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/guests",
      },
      {
        source: "/api/meetings/:meetingId/guests/:guestId/reject",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/guests/:guestId/reject",
      },
      {
        source: "/api/meetings/:meetingId/members",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/members",
      },
      {
        source: "/api/meetings/:meetingId/pre-guests",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/pre-guests",
      },
      {
        source: "/api/meetings/:meetingId/pre-guests/:guestId/accept",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/pre-guests/:guestId/accept",
      },
      {
        source: "/api/meetings/:meetingId/pre-guests/:guestId/reject",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/meetings/:meetingId/pre-guests/:guestId/reject",
      },
    ];
  },
};

export default nextConfig;
