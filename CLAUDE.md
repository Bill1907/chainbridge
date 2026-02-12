# Project Overview

ChainBridge는 블록체인 UX 추상화 레이어 SDK + 데모 앱 프로젝트입니다. ERC-4337 Account Abstraction을 활용하여 "카카오 로그인 → 스마트 지갑 자동 생성 → 가스비 없이 NFT 민팅"을 구현합니다.

# Tech Stack

## Monorepo

* Runtime & Package Manager: Bun (workspaces)
* Build System: Turborepo
* Language: TypeScript (strict mode)

## apps/demo (데모 앱)

* Framework: TanStack Start (Vinxi + TanStack Router)
* Routing: File-based routing (app/routes/)
* Styling: Tailwind CSS
* Auth: 카카오 OAuth (TanStack Start 서버 함수로 구현)
* State: TanStack Query (서버 상태 관리)

## packages/sdk (@chainbridge/sdk)

* Blockchain: ethers.js v6
* AA Infrastructure: Alchemy Account Kit (@alchemy/aa-alchemy, @alchemy/aa-core)
* Network: Sepolia Testnet (개발), Ethereum Mainnet (프로덕션)
* Smart Contract: ERC-721 (OpenZeppelin 기반)

# Project Structure

```
chainbridge/
├── apps/
│   └── demo/                    # TanStack Start 데모 앱
│       ├── app/
│       │   ├── routes/          # 파일 기반 라우팅
│       │   │   ├── __root.tsx
│       │   │   ├── index.tsx    # 랜딩 (카카오 로그인)
│       │   │   └── dashboard.tsx # 지갑 정보 + NFT 민팅
│       │   ├── components/      # UI 컴포넌트
│       │   ├── lib/             # 유틸리티 & 서버 함수
│       │   └── styles/
│       ├── app.config.ts
│       └── package.json
│
├── packages/
│   └── sdk/                     # @chainbridge/sdk
│       ├── src/
│       │   ├── index.ts         # 메인 export
│       │   ├── client.ts        # ChainBridge 클라이언트
│       │   ├── account.ts       # Smart Account 생성/관리
│       │   ├── paymaster.ts     # 가스비 대납 로직
│       │   └── types.ts         # 타입 정의
│       └── package.json
│
├── turbo.json
├── package.json                 # 루트 (workspaces 정의)
├── bun.lock
└── CLAUDE.md
```

# Commands

```bash
# 개발 서버 (전체)
bun run dev

# 빌드 (전체)
bun run build

# 특정 앱/패키지만 실행
bunx turbo dev --filter=demo
bunx turbo build --filter=@chainbridge/sdk

# 린트 & 타입체크
bun run lint
bun run typecheck

# 의존성 설치
bun install

# 특정 패키지에 의존성 추가
cd apps/demo && bun add <package>
cd packages/sdk && bun add <package>
```

# Architecture & Key Concepts

## ERC-4337 Account Abstraction Flow

```
사용자 (카카오 로그인)
  → UserOperation 생성
  → Bundler가 수집 & 제출
  → EntryPoint 컨트랙트가 검증
  → Paymaster가 가스비 대납
  → Smart Account에서 트랜잭션 실행
```

## SDK 사용 패턴

```typescript
import { ChainBridge } from '@chainbridge/sdk'

const cb = new ChainBridge({
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  chain: 'sepolia',
  paymaster: true,
})

// Smart Account 생성
const account = await cb.createAccount(userId)

// NFT 민팅 (가스비 0원)
const tx = await cb.mint(account, contractAddress)
```

## 서버 함수 패턴 (TanStack Start)

```typescript
import { createServerFn } from '@tanstack/react-start'

// 서버에서만 실행되는 함수
export const getSession = createServerFn({ method: 'GET' })
  .handler(async () => {
    // 쿠키에서 세션 읽기
  })

export const kakaoCallback = createServerFn({ method: 'POST' })
  .validator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    // 카카오 OAuth 토큰 교환
  })
```

# Coding Conventions

## General

* TypeScript strict mode 사용
* 한국어 주석 허용 (코드는 영어)
* 함수명/변수명은 camelCase, 타입/인터페이스는 PascalCase
* 파일명은 kebab-case (라우트 파일 제외)

## SDK (packages/sdk)

* 모든 public API에 JSDoc 주석 필수
* 에러는 커스텀 ChainBridgeError 클래스 사용
* 외부 의존성 최소화
* Tree-shaking 가능하도록 named export 사용

## Demo App (apps/demo)

* TanStack Router 파일 기반 라우팅 컨벤션 준수
* 서버 로직은 반드시 createServerFn으로 분리
* 컴포넌트는 함수 컴포넌트만 사용
* Tailwind CSS 유틸리티 클래스 사용 (커스텀 CSS 최소화)

## Git

* 커밋 메시지: Conventional Commits (feat:, fix:, chore:, docs:)
* 브랜치: feature/, fix/, chore/ prefix

# Environment Variables

```bash
# .env.example
ALCHEMY_API_KEY=             # Alchemy API 키
ALCHEMY_GAS_POLICY_ID=       # Alchemy Gas Manager Policy ID
KAKAO_CLIENT_ID=             # 카카오 REST API 키
KAKAO_CLIENT_SECRET=         # 카카오 Client Secret
NFT_CONTRACT_ADDRESS=        # 배포된 ERC-721 컨트랙트 주소
SESSION_SECRET=              # 세션 암호화 키
```

# Important Notes

* 이 프로젝트는 학습 목적이며, Sepolia 테스트넷에서만 동작합니다
* Alchemy Account Kit 공식 예제가 Next.js 기반이므로, TanStack Start에서 어댑팅이 필요할 수 있습니다
* Smart Account 생성은 첫 트랜잭션 시점에 실제 배포됩니다 (counterfactual deployment)
* Paymaster 설정 시 Gas Manager Policy에서 허용할 컨트랙트 주소를 명시해야 합니다

# Bun 관련 참고

* 워크스페이스는 루트 package.json의 `"workspaces": ["apps/*", "packages/*"]`로 정의 (pnpm-workspace.yaml 사용하지 않음)
* Bun은 대부분의 Node.js API를 호환하지만, Vinxi(TanStack Start 내부) 또는 Alchemy SDK에서 Node 전용 API 이슈가 발생할 경우 --bun 플래그 제거 후 Node.js 폴백 고려
* bun.lock은 Git에 커밋 (lockfile 일관성 유지)
* 네이티브 모듈 관련 이슈 시 node_modules/.cache 삭제 후 bun install 재실행
