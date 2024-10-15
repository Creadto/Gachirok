/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/profiles",
        destination: "https://dev.gachiga.creadto.com/api/v1/profiles",
        //CORS해결하는 방법 ->CORS문제가 발생하는 곳에서 source의 코드를 destination에 해당하는 URL로 우회 요청함
      },
      {
        source: "/api/users",
        destination: "https://dev.gachiga.creadto.com/api/v1/users",
      },
      {
        source: "/api/meetings",
        destination: "https://dev.gachiga.creadto.com/api/v1/meetings",
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
        // source에서 쿼리 파라미터를 유지한 채로 destination으로 전달
        source: "/api/profiles/check-nickname",
        destination:
          "https://dev.gachiga.creadto.com/api/v1/profiles/check-nickname", // 쿼리 파라미터는 그대로 전달됨
      },
    ];
  },
};

export default nextConfig;
