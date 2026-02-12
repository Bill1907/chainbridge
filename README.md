# ChainBridge

> 카카오 로그인으로 시작하는 Web3 경험 — 블록체인 UX 추상화 레이어 SDK + 데모 앱

[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-runtime-f9f1e1)](https://bun.sh/)
[![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-EF4444)](https://turbo.build/)
[![Sepolia](https://img.shields.io/badge/Network-Sepolia_Testnet-purple)](https://sepolia.etherscan.io/)

---

## 개요

ChainBridge는 **ERC-4337 Account Abstraction**을 활용하여 블록체인의 복잡한 UX를 추상화하는 SDK입니다.

```
카카오 로그인 → 스마트 지갑 자동 생성 → 가스비 없이 NFT 민팅
```

사용자는 지갑 설치, 시드 구문 백업, 가스비 충전 같은 과정 없이 Web3 서비스를 경험할 수 있습니다.

## 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│  사용자 (카카오 로그인)                                    │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Demo App (TanStack Start)                              │
│  ┌───────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Landing   │  │  Dashboard   │  │  Server Functions │  │
│  │  (OAuth)   │  │  (Wallet/NFT)│  │  (Auth/Session)  │  │
│  └───────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  @chainbridge/sdk                                       │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────────┐  │
│  │  Client   │  │  Account  │  │  Paymaster           │  │
│  │          │  │  (AA)     │  │  (가스비 대납)         │  │
│  └──────────┘  └───────────┘  └──────────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Blockchain Layer                                       │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────────┐  │
│  │ Bundler  │  │ EntryPoint│  │  ERC-721 Contract     │  │
│  └──────────┘  └───────────┘  └──────────────────────┘  │
│                    Sepolia Testnet                       │
└─────────────────────────────────────────────────────────┘
```

## 프로젝트 구조

```
chainbridge/
├── apps/
│   └── demo/                    # TanStack Start 데모 앱
│       ├── app/
│       │   ├── routes/          # 파일 기반 라우팅
│       │   │   ├── __root.tsx   # 루트 레이아웃
│       │   │   ├── index.tsx    # 랜딩 (카카오 로그인)
│       │   │   └── dashboard.tsx # 지갑 정보 + NFT 민팅
│       │   ├── components/      # UI 컴포넌트
│       │   ├── lib/             # 유틸리티 & 서버 함수
│       │   └── styles/          # 글로벌 스타일
│       ├── vite.config.ts
│       └── package.json
│
├── packages/
│   └── sdk/                     # @chainbridge/sdk
│       ├── src/
│       │   ├── index.ts         # Public API exports
│       │   ├── client.ts        # ChainBridge 메인 클라이언트
│       │   ├── account.ts       # Smart Account 생성/관리
│       │   ├── paymaster.ts     # 가스비 대납 로직
│       │   ├── errors.ts        # ChainBridgeError 클래스
│       │   └── types.ts         # 타입 정의
│       └── package.json
│
├── turbo.json                   # Turborepo 설정
├── package.json                 # 루트 (Bun workspaces)
└── CLAUDE.md                    # 프로젝트 컨벤션
```

## 시작하기

### 사전 요구사항

- [Bun](https://bun.sh/) v1.0+
- Node.js v22+ (일부 도구 호환성)

### 설치

```bash
# 의존성 설치
bun install

# 전체 빌드
bun run build
```

### 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열고 필요한 값을 채워주세요:

| 변수 | 설명 | 발급처 |
|------|------|--------|
| `ALCHEMY_API_KEY` | Alchemy API 키 | [Alchemy Dashboard](https://dashboard.alchemy.com/) |
| `ALCHEMY_GAS_POLICY_ID` | Gas Manager Policy ID | Alchemy Dashboard > Gas Manager |
| `KAKAO_CLIENT_ID` | 카카오 REST API 키 | [Kakao Developers](https://developers.kakao.com/) |
| `KAKAO_CLIENT_SECRET` | 카카오 Client Secret | Kakao Developers > 보안 |
| `NFT_CONTRACT_ADDRESS` | ERC-721 컨트랙트 주소 | 직접 배포 |
| `SESSION_SECRET` | 세션 암호화 키 | 임의 문자열 생성 |

### 개발 서버

```bash
# 전체 워크스페이스 개발 모드
bun run dev

# 특정 패키지만 실행
bunx turbo dev --filter=demo
bunx turbo build --filter=@chainbridge/sdk
```

## SDK 사용법

```typescript
import { ChainBridge } from '@chainbridge/sdk'

// 클라이언트 초기화
const cb = new ChainBridge({
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  chain: 'sepolia',
  paymaster: true,
  gasPolicyId: process.env.ALCHEMY_GAS_POLICY_ID,
})

// Smart Account 생성 (카카오 사용자 ID 기반)
const account = await cb.createAccount(kakaoUserId)

// NFT 민팅 — 가스비 0원
const tx = await cb.mint(account, contractAddress)
console.log(`Transaction: ${tx.hash}`)
```

## 기술 스택

| 영역 | 기술 |
|------|------|
| **Monorepo** | Bun Workspaces + Turborepo |
| **Language** | TypeScript (strict mode) |
| **Demo App** | TanStack Start + TanStack Router + Tailwind CSS |
| **SDK** | ethers.js v6 + Alchemy Account Kit |
| **Auth** | 카카오 OAuth |
| **Network** | Sepolia Testnet (ERC-4337) |
| **Smart Contract** | ERC-721 (OpenZeppelin) |

## 주요 명령어

```bash
bun run dev          # 개발 서버 실행
bun run build        # 전체 빌드
bun run lint         # 린트 검사
bun run typecheck    # 타입 체크
bun run clean        # 빌드 산출물 제거
```

## ERC-4337 Account Abstraction 흐름

```
1. 사용자가 카카오로 로그인
2. 서버에서 카카오 ID 기반으로 Smart Account 주소 계산 (counterfactual)
3. 사용자가 NFT 민팅 요청
4. SDK가 UserOperation 생성
5. Paymaster가 가스비 대납 승인
6. Bundler가 UserOperation을 EntryPoint에 제출
7. Smart Account가 처음 사용되면 이 시점에 온체인 배포
8. NFT 민팅 트랜잭션 실행 완료
```

## 참고 사항

- 이 프로젝트는 **학습 목적**이며, Sepolia 테스트넷에서만 동작합니다
- Smart Account는 첫 트랜잭션 시점에 실제 배포됩니다 (counterfactual deployment)
- Paymaster 설정 시 Gas Manager Policy에서 허용할 컨트랙트 주소를 명시해야 합니다
- Alchemy Account Kit 공식 예제가 Next.js 기반이므로, TanStack Start에서 어댑팅이 필요할 수 있습니다

## 라이선스

MIT
