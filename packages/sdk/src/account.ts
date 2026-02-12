import type { SmartAccount, ChainBridgeConfig } from './types.js'
import { ChainBridgeError } from './errors.js'
import { ChainBridgeErrorCode } from './types.js'

/**
 * Smart Account 생성 및 관리를 담당하는 모듈
 * ERC-4337 Account Abstraction 기반의 Smart Account를 생성합니다.
 */

/**
 * 사용자 ID를 기반으로 Smart Account를 생성합니다.
 * Counterfactual deployment 방식으로, 실제 온체인 배포는 첫 트랜잭션 시점에 이루어집니다.
 *
 * @param ownerId - 계정 소유자 식별자 (예: 카카오 사용자 ID)
 * @param config - ChainBridge 설정
 * @returns 생성된 Smart Account 정보
 * @throws {ChainBridgeError} 계정 생성 실패 시
 */
export async function createSmartAccount(
  ownerId: string,
  config: ChainBridgeConfig,
): Promise<SmartAccount> {
  try {
    // TODO: Alchemy Account Kit을 사용한 Smart Account 생성 구현
    // 1. Owner의 signer 생성 (ownerId 기반)
    // 2. LightAccount 또는 SimpleAccount 인스턴스 생성
    // 3. Counterfactual address 계산

    // 현재는 placeholder - 실제 구현 시 Alchemy AA SDK 연동 필요
    throw new ChainBridgeError(
      'Smart Account 생성은 아직 구현되지 않았습니다. Alchemy Account Kit 연동이 필요합니다.',
      ChainBridgeErrorCode.ACCOUNT_CREATION_FAILED,
    )
  } catch (error) {
    if (error instanceof ChainBridgeError) throw error
    throw new ChainBridgeError(
      `Smart Account 생성 실패: ${error instanceof Error ? error.message : String(error)}`,
      ChainBridgeErrorCode.ACCOUNT_CREATION_FAILED,
      error instanceof Error ? error : undefined,
    )
  }
}

/**
 * Smart Account의 온체인 배포 여부를 확인합니다.
 *
 * @param address - Smart Account 주소
 * @param config - ChainBridge 설정
 * @returns 배포 여부
 */
export async function isAccountDeployed(
  address: string,
  _config: ChainBridgeConfig,
): Promise<boolean> {
  // TODO: ethers.js를 사용하여 주소의 bytecode 존재 여부 확인
  void address
  return false
}
