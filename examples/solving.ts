const { Captcha } = require("../src/index");
const fs = require("fs");

const captcha = new Captcha({
  type: 2,
  key: "60becde3fbdc8571701759894de7686f"
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
