import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

/**
 * 현재 세션 정보를 조회합니다.
 */
export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    // TODO: 쿠키에서 세션 읽기
    // 세션에는 카카오 사용자 ID, Smart Account 주소 등이 포함됨
    return null
  },
)

/**
 * 카카오 OAuth 인가 코드를 받아 토큰을 교환합니다.
 */
export const kakaoCallback = createServerFn({ method: 'POST' })
  .validator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    const { code } = data

    // TODO: 카카오 OAuth 토큰 교환
    // 1. POST https://kauth.kakao.com/oauth/token 으로 access_token 요청
    // 2. access_token으로 사용자 정보 조회
    // 3. 세션 생성 및 쿠키에 저장
    // 4. Smart Account가 없으면 생성

    void code

    return { success: false, message: '아직 구현되지 않았습니다' }
  })

/**
 * 로그아웃 처리
 */
export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  // TODO: 세션 쿠키 삭제
  return { success: true }
})
