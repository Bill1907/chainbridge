import type {
  ChainBridgeConfig,
  SmartAccount,
  TransactionResult,
  MintOptions,
} from './types.js'
import { ChainBridgeErrorCode } from './types.js'
import { ChainBridgeError } from './errors.js'
import { createSmartAccount } from './account.js'
import { validatePaymasterConfig } from './paymaster.js'

/**
 * ChainBridge 메인 클라이언트
 *
 * 블록체인 UX 추상화를 위한 통합 인터페이스를 제공합니다.
 * ERC-4337 Account Abstraction 기반으로 가스비 없는 트랜잭션을 지원합니다.
 *
 * @example
 * ```typescript
 * const cb = new ChainBridge({
 *   alchemyApiKey: process.env.ALCHEMY_API_KEY,
 *   chain: 'sepolia',
 *   paymaster: true,
 *   gasPolicyId: process.env.ALCHEMY_GAS_POLICY_ID,
 * })
 *
 * const account = await cb.createAccount(userId)
 * const tx = await cb.mint(account, contractAddress)
 * ```
 */
export class ChainBridge {
  private readonly config: ChainBridgeConfig

  constructor(config: ChainBridgeConfig) {
    this.validateConfig(config)
    this.config = config
  }

  /**
   * 초기화 설정을 검증합니다.
   */
  private validateConfig(config: ChainBridgeConfig): void {
    if (!config.alchemyApiKey) {
      throw new ChainBridgeError(
        'alchemyApiKey는 필수입니다.',
        ChainBridgeErrorCode.INVALID_CONFIG,
      )
    }

    if (!config.chain) {
      throw new ChainBridgeError(
        'chain은 필수입니다.',
        ChainBridgeErrorCode.INVALID_CONFIG,
      )
    }

    validatePaymasterConfig(config)
  }

  /**
   * 사용자 ID를 기반으로 Smart Account를 생성합니다.
   *
   * @param ownerId - 계정 소유자 식별자 (예: 카카오 사용자 ID)
   * @returns 생성된 Smart Account 정보
   */
  async createAccount(ownerId: string): Promise<SmartAccount> {
    return createSmartAccount(ownerId, this.config)
  }

  /**
   * Smart Account를 통해 NFT를 민팅합니다.
   * Paymaster가 활성화된 경우 가스비가 대납됩니다.
   *
   * @param account - 트랜잭션을 실행할 Smart Account
   * @param contractAddress - NFT 컨트랙트 주소
   * @param options - 민팅 옵션
   * @returns 트랜잭션 결과
   */
  async mint(
    account: SmartAccount,
    contractAddress: string,
    _options?: MintOptions,
  ): Promise<TransactionResult> {
    try {
      // TODO: UserOperation 생성 및 전송 구현
      // 1. NFT 컨트랙트의 mint 함수 calldata 생성
      // 2. UserOperation 구성 (sender, callData, ...)
      // 3. Paymaster 활성화 시 paymasterAndData 설정
      // 4. Bundler를 통해 UserOperation 전송
      // 5. 트랜잭션 receipt 대기

      void account
      void contractAddress

      throw new ChainBridgeError(
        'NFT 민팅은 아직 구현되지 않았습니다.',
        ChainBridgeErrorCode.TRANSACTION_FAILED,
      )
    } catch (error) {
      if (error instanceof ChainBridgeError) throw error
      throw new ChainBridgeError(
        `NFT 민팅 실패: ${error instanceof Error ? error.message : String(error)}`,
        ChainBridgeErrorCode.TRANSACTION_FAILED,
        error instanceof Error ? error : undefined,
      )
    }
  }

  /**
   * 현재 설정된 체인 정보를 반환합니다.
   */
  getChain(): string {
    return this.config.chain
  }

  /**
   * Paymaster 활성화 여부를 반환합니다.
   */
  isPaymasterEnabled(): boolean {
    return this.config.paymaster ?? false
  }
}
