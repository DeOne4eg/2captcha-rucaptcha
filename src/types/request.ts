import * as Types from "./../utils/types";

export interface IRequest {
  // your API key
  key?: string;

  // Format for IP authentication: IP_address:PORT
  // Example: proxy=123.123.123.123:3128
  // Format for login/password authentication: login:password@IP_address:PORT
  // Example: proxy=proxyuser:strongPassword@123.123.123.123:3128
  proxy?: string;

  // Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5.
  proxytype?: Types.ProxyType;

  // 0 disabled
  // 1 enabled
  // If enabled in.php will include Access-Control-Allow-Origin:* header in the response
  // Used for cross-domain AJAX requests in web applications.
  header_acao?: Types.DigitalBool;

  // 0 - server will send the response as plain text
  // 1 - tells the server to send the response as JSON
  json?: Types.DigitalBool;
}
