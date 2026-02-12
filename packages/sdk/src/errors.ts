import { ChainBridgeErrorCode } from './types.js'

/**
 * ChainBridge SDK 전용 에러 클래스
 * 모든 SDK 에러는 이 클래스를 통해 던져집니다.
 */
export class ChainBridgeError extends Error {
  /** 에러 코드 */
  readonly code: ChainBridgeErrorCode
  /** 원본 에러 (있을 경우) */
  readonly cause?: Error

  constructor(
    message: string,
    code: ChainBridgeErrorCode,
    cause?: Error,
  ) {
    super(message)
    this.name = 'ChainBridgeError'
    this.code = code
    this.cause = cause
  }
}
