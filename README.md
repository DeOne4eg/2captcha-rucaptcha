# Simple 2captcha and rucaptcha API wrapper for Node.js

[![npm version](https://img.shields.io/static/v1?label=npm&message=v1.0.0&color=brightgreen)](https://www.npmjs.com/package/2captcha-bot)
[![coverage](https://img.shields.io/static/v1?label=coverage&message=100%&color=blue)](https://www.npmjs.com/package/2captcha-bot)
[![build](https://img.shields.io/static/v1?label=build&message=passing&color=green)](https://www.npmjs.com/package/2captcha-bot)

The package is written in TypeScript and currently only supports base64 images.

## Instalation

NPM:

```bash
npm i 2captcha-bot --save
```

Yarn:

```bash
yarn add 2captcha-bot
```

## Usage

All examples are on the github.

### Upload image to rucaptcha

```typescript
import TwoCaptcha from "../src/index";
import * as fs from "fs";

const captcha = new Captcha({
  type: 1,
  key: "<YOUR_API_KEY>"
});

const base64 = fs.readFileSync("base64.txt", "utf-8");
captcha
  .solve({ method: "base64", body: base64 })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### Upload image to 2captcha

```typescript
import TwoCaptcha from "../src/index";
import * as fs from "fs";

const captcha = new Captcha({
  type: 2,
  key: "<YOUR_API_KEY>"
});

const base64 = fs.readFileSync("base64.txt", "utf-8");
captcha
  .solve({ method: "base64", body: base64 })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### Available options to create an instance

| Name  | Required | Description                                                                      |
| ----- | :------: | -------------------------------------------------------------------------------- |
| type  |    +     | 1 - rucaptcha<br>2 - 2captcha                                                    |
| key   |    +     | Your API key                                                                     |
| delay |    -     | Delay before receiving a captcha recognition response in seconds<br>Default - 3s |

### Available options solve()

| Name             | Required | Description                                                                                                                                                                                       |
| ---------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method           |    +     | post (multipart form) or base64 (image base64 encode)                                                                                                                                             |
| phrase           |    -     | 0 - captcha contains one word<br>1 - captcha contains two or more words                                                                                                                           |
| regsense         |    -     | 0 - captcha in not case sensitive<br>1 - captcha is case sensitive                                                                                                                                |
| numeric          |    -     | 0 - not specified<br>1 - captcha contains only numbers<br>2 - captcha contains only letters<br>3 - captcha contains only numbers OR only letters<br>4 - captcha contains both numbers AND letters |
| calc             |    -     | 0 - not specified<br>1 - captcha requires calculation (e.g. type the result 4 + 8 = )                                                                                                             |
| min_len          |    -     | 0 - not specified<br>1..20 - minimal number of symbols in captcha                                                                                                                                 |
| max_len          |    -     | 0 - not specified<br>1..20 - maximal number of symbols in captcha                                                                                                                                 |
| language         |    -     | 0 - not specified<br>1 - Cyrillic captcha<br>2 - Latin captcha.                                                                                                                                   |
| lang             |    -     | ru, en and etc.                                                                                                                                                                                   |
| textinstructions |    -     | Text will be shown to worker to help him to solve the captcha correctly.                                                                                                                          |
| imginstructions  |    -     | BASE64<br>Image will be shown to worker to help him to solve the captcha correctly.                                                                                                               |
| pingback         |    -     | URL for pingback (callback) response that will be sent when captcha is solved.<br>URL should be registered on the server.                                                                         |
| header_acao      |    -     | 0 - disabled<br>1 - enabled.<br>If enabled in.php will include Access-Control-Allow-Origin:\* header in the response.<br>Used for cross-domain AJAX requests in web applications.                 |
| softId           |    -     | ID of software developer                                                                                                                                                                          |

#### Example:

```typescript
captcha.solve({ method: "base64", body: base64, lang: "ru", numeric: 1 });
```

### Proxy

Passed to the solve() along with the options above.

| Name      | Description                                                                                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| proxy     | Format for IP authentication: IP_address:PORT<br>Example: proxy=123.123.123.123:3128<br>Format for login/password authentication: login:password@IP_address:PORT<br>Example: proxy=proxyuser:strongPassword@123.123.123.123:3128 |
| proxytype | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5.                                                                                                                                                                                 |
