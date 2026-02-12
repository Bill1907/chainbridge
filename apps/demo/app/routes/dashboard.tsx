import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">내 지갑</h1>
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {
              // TODO: 로그아웃 처리
            }}
          >
            로그아웃
          </button>
        </div>

        {/* 지갑 정보 카드 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-medium text-gray-500">
            Smart Account
          </h2>
          <p className="font-mono text-sm text-gray-800">
            {/* TODO: 실제 지갑 주소 표시 */}
            0x0000...0000
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Sepolia
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              가스비 무료
            </span>
          </div>
        </div>

        {/* NFT 민팅 카드 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">NFT 민팅</h2>
          <p className="mb-4 text-sm text-gray-600">
            가스비 없이 나만의 NFT를 발행해보세요. Paymaster가 가스비를
            대납합니다.
          </p>
          <button
            type="button"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            onClick={() => {
              // TODO: NFT 민팅 로직 연결
            }}
          >
            NFT 민팅하기
          </button>
        </div>

        {/* 트랜잭션 히스토리 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">트랜잭션 내역</h2>
          <p className="text-center text-sm text-gray-400">
            아직 트랜잭션이 없습니다
          </p>
        </div>
      </div>
    </div>
  )
}
