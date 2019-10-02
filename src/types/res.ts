import * as Types from "./../utils/types";
import { IRequest } from "./request" 

export interface ResRequest extends IRequest {
    // getbalance — get your balance
    // get — get answers for multiple captchas with one request. Requires the list of captcha IDs in ids parameter.
    // get2 — get the price of sent captcha and the answer. Requires captcha ID in id parameter.
    // reportbad - report incorrectly solved captcha. Requires captcha ID in id parameter.
    // reportgood - confirm correct answer. Requires captcha ID in id parameter.
    action?: string;

    // captcha ID
    id?: string;

    // captcha IDs (action=get). Comma separated. For example: 1,2,3,4
    ids?: string;
}

export interface ResResponse {
    status: Types.DigitalBool;
    request: string;
    price?: string;
}