const axios = require("axios");
const delay = require("delay");

import * as I from "./types/in";
import * as IR from "./types/res";
import Config from "./types/config";

enum urls1 {
  GET = "http://rucaptcha.com/res.php",
  POST = "http://rucaptcha.com/in.php"
}

enum urls2 {
  GET = "http://2captcha.com/res.php",
  POST = "http://2captcha.com/in.php"
}

export class Captcha {
  readonly key: string;
  readonly delay: number;
  readonly type: number;

  public id: string;

  /**
   * @param  {Config} config
   */
  constructor(config: Config) {
    this.key = config.key;
    this.type = config.type;
    this.id = '';

    if (config.delay === undefined) this.delay = 3;
    else this.delay = config.delay;
  }

  /**
   * @param  {I.InRequest} options
   * @returns Promise<string>
   */
  public async solve(options: I.InRequest): Promise<string> {
    return new Promise(async (resolve, reject) => {
      options.key = this.key;
      options.json = 1;

      try {
        const data: I.InResponse = await this.sendPost(options);
        if (data.status) {
          const id: string = data.request.toString();
          this.id = id;
          let result: string = await this.solver({ id });
          resolve(result);
        } else reject(data.request);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @param  {IR.ResRequest} options
   * @returns Promise<string>
   */
  private async solver(options: IR.ResRequest): Promise<string> {
    return new Promise(async (resolve, reject) => {
      options.action = "get";
      options.key = this.key;
      options.json = 1;

      while (true) {
        try {
          const data: IR.ResResponse = await this.sendGet(options);
          if (data.status) {
            resolve(data.request);
            break;
          } else if (data.request === "CAPCHA_NOT_READY")
            await delay(this.delay * 1000);
          else reject(data.request);
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  /**
   * @returns Promise<string>
   */
  public async balance(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const options: IR.ResRequest = {
        action: "getbalance",
        key: this.key,
        json: 1
      };

      try {
        const data: IR.ResResponse = await this.sendGet(options);
        if (data.status) resolve(data.request);
        else reject(data.request);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @param  {string} id
   * @returns Promise<string>
   */
  public async good(id: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const options = {
        action: "reportgood",
        key: this.key,
        json: 1,
        id
      } as IR.ResRequest;

      try {
        const data: IR.ResResponse = await this.sendGet(options);
        if (data.status) resolve(data.request);
        else reject(data.request);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @param  {string} id
   * @returns Promise<string>
   */
  public async bad(id: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const options = {
        action: "reportbad",
        key: this.key,
        json: 1,
        id
      } as IR.ResRequest;

      try {
        const data: IR.ResResponse = await this.sendGet(options);
        if (data.status) resolve(data.request);
        else reject(data.request);
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * @param  {IR.ResRequest} options
   * @returns Promise<IR.ResResponse>
   */
  private async sendGet(options: IR.ResRequest): Promise<IR.ResResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.type === 1 ? urls1.GET : urls2.GET;
        const response: any = await axios.get(url, {
          params: options
        });

        const data: IR.ResResponse = response.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * @param  {I.InRequest} options
   * @returns Promise<I.InResponse>
   */
  private async sendPost(options: I.InRequest): Promise<I.InResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.type === 1 ? urls1.POST : urls2.POST;
        const response: any = await axios.post(url, options);
        const data: I.InResponse = response.data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
}
