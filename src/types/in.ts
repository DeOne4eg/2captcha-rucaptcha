import * as Types from "./../utils/types";
import { IRequest } from "./request";

export interface InRequest extends IRequest {
  // post - defines that you're sending an image with multipart form
  // base64 - defines that you're sending a base64 encoded image
  method: Types.Method;

  // base64 image
  body?: string;

  // 0 - captcha contains one word
  // 1 - captcha contains two or more words
  phrase?: Types.DigitalBool;

  // 0 - captcha in not case sensitive
  // 1 - captcha is case sensitive
  regsense?: Types.DigitalBool;

  // 0 - not specified
  // 1 - captcha contains only numbers
  // 2 - captcha contains only letters
  // 3 - captcha contains only numbers OR only letters
  // 4 - captcha contains both numbers AND letters
  numeric?: number;

  // 0 - not specified
  // 1 - captcha requires calculation (e.g. type the result 4 + 8 = )
  calc?: Types.DigitalBool;

  // 0 - not specified
  // 1..20 - minimal number of symbols in captcha
  min_len?: number;

  // 0 - not specified
  // 1..20 - maximal number of symbols in captcha
  max_len?: number;

  // 0 - not specified
  // 1 - Cyrillic captcha
  // 2 - Latin captcha.
  language?: number;

  // ru, en and etc.
  lang?: string;

  // Text will be shown to worker to help him to solve the captcha correctly
  // For example: type red symbols only.
  textinstructions?: string;

  // BASE64
  // Image will be shown to worker to help him to solve the captcha correctly.
  imginstructions?: string;

  // URL for pingback (callback) response that will be sent when captcha is solved.
  // URL should be registered on the server.
  pingback?: string;

  // ID of software developer.
  softId?: number;
}

export interface InResponse {
  status: Types.DigitalBool;
  request: string;
}
