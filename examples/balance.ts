const { Captcha } = require("../src/index");

const captcha = new Captcha({
  type: 2,
  key: "60becde3fbdc8571701759894de7686f"
});

captcha
  .balance()
  .then(balance => {
    console.log(balance);
  })
  .catch(e => {
    console.log(e);
  });
