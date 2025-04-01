/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 정적 파일 서빙을 위한 설정 추가
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/static/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
