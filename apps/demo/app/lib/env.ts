import { z } from 'zod'

const envSchema = z.object({
  ALCHEMY_API_KEY: z.string().min(1),
  ALCHEMY_GAS_POLICY_ID: z.string().min(1),
  KAKAO_CLIENT_ID: z.string().min(1),
  KAKAO_CLIENT_SECRET: z.string().min(1),
  NFT_CONTRACT_ADDRESS: z.string().min(1),
  SESSION_SECRET: z.string().min(1),
})

/** 타입 안전한 환경 변수 접근 (서버에서만 사용) */
export function getEnv() {
  return envSchema.parse(process.env)
}

export type Env = z.infer<typeof envSchema>
