import type { ChainBridgeConfig } from './types.js'
import { ChainBridgeError } from './errors.js'
import { ChainBridgeErrorCode } from './types.js'

/**
 * Paymaster(가스비 대납) 관련 로직을 담당하는 모듈
 * Alchemy Gas Manager를 통해 사용자의 가스비를 대납합니다.
 */

/**
 * Paymaster 설정을 검증합니다.
 *
 * @param config - ChainBridge 설정
 * @throws {ChainBridgeError} Paymaster 설정이 유효하지 않을 경우
 */
export function validatePaymasterConfig(config: ChainBridgeConfig): void {
  if (config.paymaster && !config.gasPolicyId) {
    throw new ChainBridgeError(
      'Paymaster 활성화 시 gasPolicyId가 필요합니다.',
      ChainBridgeErrorCode.INVALID_CONFIG,
    )
  }
}

/**
 * Gas Manager Policy가 특정 컨트랙트 호출을 허용하는지 확인합니다.
 *
 * @param contractAddress - 호출할 컨트랙트 주소
 * @param config - ChainBridge 설정
 * @returns 허용 여부
 */
export async function isSponsoredContract(
  contractAddress: string,
  _config: ChainBridgeConfig,
): Promise<boolean> {
  // TODO: Alchemy Gas Manager API를 통해 Policy 확인
  void contractAddress
  return false
}
