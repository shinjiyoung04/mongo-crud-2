// Next.js 구성 설정
const nextConfig = {
  // React Strict Mode 활성화
  reactStrictMode: true,

  // SWC Minify 활성화 (빠른 빌드)
  swcMinify: true,

  // 이미지 설정: 원격 이미지 로드 패턴 설정
  images: {
    remotePatterns: [
      // GitHub Avatars 이미지를 원격에서 로드할 수 있도록 설정
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // Google Avatars 이미지를 원격에서 로드할 수 있도록 설정
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // Webpack 설정
  webpack: (config, { isServer }) => {
    // 특정 서버-클라이언트 차이 작업을 처리하고 싶다면 여기에 작성
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // 'fs' 모듈 비활성화 (클라이언트에서 사용 불가)
      }
    }
    return config
  },

  // 환경 변수 설정
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_URL: process.env.API_URL,
  },
}

export default nextConfig
