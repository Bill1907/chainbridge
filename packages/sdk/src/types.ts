/** 지원하는 체인 네트워크 */
export type Chain = 'sepolia' | 'mainnet'

/** ChainBridge 클라이언트 초기화 옵션 */
export interface ChainBridgeConfig {
  /** Alchemy API 키 */
  alchemyApiKey: string
  /** 사용할 체인 네트워크 */
  chain: Chain
  /** Paymaster(가스비 대납) 활성화 여부 */
  paymaster?: boolean
  /** Alchemy Gas Manager Policy ID (paymaster 활성화 시 필수) */
  gasPolicyId?: string
}

/** Smart Account 정보 */
export interface SmartAccount {
  /** Smart Account 컨트랙트 주소 */
  address: string
  /** 계정 소유자 식별자 */
  ownerId: string
  /** 계정이 온체인에 배포되었는지 여부 */
  isDeployed: boolean
}

/** 트랜잭션 결과 */
export interface TransactionResult {
  /** 트랜잭션 해시 */
  hash: string
  /** 트랜잭션 상태 */
  status: 'success' | 'failed'
  /** 블록 번호 */
  blockNumber?: number
}

/** NFT 민팅 옵션 */
export interface MintOptions {
  /** 민팅할 토큰의 metadata URI */
  tokenURI?: string
}

/** ChainBridge 에러 코드 */
export enum ChainBridgeErrorCode {
  INVALID_CONFIG = 'INVALID_CONFIG',
  ACCOUNT_CREATION_FAILED = 'ACCOUNT_CREATION_FAILED',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  PAYMASTER_ERROR = 'PAYMASTER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  CONTRACT_ERROR = 'CONTRACT_ERROR',
}
