// next.config.mjs

// Next.js 구성 설정
const nextConfig = {
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

  // 여기서 추가적인 Next.js 설정을 할 수 있습니다
  // 예: Webpack 설정, 환경 변수, 페이지 리디렉션 등
}

export default nextConfig
