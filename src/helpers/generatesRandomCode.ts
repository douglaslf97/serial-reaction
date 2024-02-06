export function generateRandomString(length: number = 4, result: string = "", count: number = 0): string {
  const charset = "abcd"

  const randomIndex = Math.floor(Math.random() * charset.length)
  result += charset[randomIndex]
  count++

  return count < length ? generateRandomString(length, result, count) : result
}