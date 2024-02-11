/**
 * Generates a random string from a charset
 * @param length the length of the random string generated
 * @param [charset="asdf"] the charset
 * @returns the random string
 */
export function generateRandomString(length: number = 4, charset: string = "asdf"): string {
  let result = ""

  for (let i=0; i<length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length)

    while(result.includes(charset[randomIndex])) {
      randomIndex = Math.floor(Math.random() * charset.length)
    }

    result+=charset[randomIndex]
  }

  return result
}
