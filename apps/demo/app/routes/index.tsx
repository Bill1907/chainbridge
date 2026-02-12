import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* 로고 & 타이틀 */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">ChainBridge</h1>
          <p className="text-lg text-gray-600">
            카카오 로그인으로 시작하는 Web3 경험
          </p>
        </div>

        {/* 기능 설명 */}
        <div className="space-y-3 rounded-xl bg-white p-6 text-left shadow-sm">
          <Feature
            emoji="🔐"
            title="카카오 로그인"
            description="기존 카카오 계정으로 간편 로그인"
          />
          <Feature
            emoji="👛"
            title="스마트 지갑 자동 생성"
            description="로그인 시 블록체인 지갑이 자동으로 만들어집니다"
          />
          <Feature
            emoji="🎨"
            title="가스비 없이 NFT 민팅"
            description="별도 비용 없이 나만의 NFT를 발행하세요"
          />
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-kakao-yellow px-6 py-4 text-lg font-semibold text-kakao-brown transition-transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => {
            // TODO: 카카오 OAuth 로그인 흐름 시작
          }}
        >
          카카오로 시작하기
        </button>

        <p className="text-xs text-gray-400">
          Sepolia 테스트넷에서 동작합니다
        </p>
      </div>
    </div>
  )
}

function Feature({
  emoji,
  title,
  description,
}: {
  emoji: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
