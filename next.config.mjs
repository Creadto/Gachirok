/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/profiles',
          destination: 'https://dev.gachiga.creadto.com/api/v1/profiles',
          //CORS해결하는 방법 ->CORS문제가 발생하는 곳에서 source의 코드를 destination에 해당하는 URL로 우회 요청함
        },
        {
          source: '/api/users',
          destination: 'https://dev.gachiga.creadto.com/api/v1/users',
        }
      ];
    },
};

export default nextConfig;
