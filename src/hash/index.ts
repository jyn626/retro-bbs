import * as argon2 from 'argon2'

const HASH_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19456, // 19 MiB (OWASP minimum)
  timeCost: 2,       // 2 iterations
  parallelism: 1,    // 1 thread
}

export const hashString = async (data: string) => {
  return await argon2.hash(data)
}
