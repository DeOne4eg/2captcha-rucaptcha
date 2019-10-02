export default interface Config {
  // your API key
  key: string;

  // 1 - rucaptcha
  // 2 - 2captcha
  type: number;

  // delay in seconds. For example 5. Default 3.
  delay?: number;
}
