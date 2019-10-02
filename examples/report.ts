import Captcha from "../src/index";

const captcha = new Captcha({
  type: 2,
  key: "60becde3fbdc8571701759894de7686f"
});

captcha
  .bad({ id: "62376069684" })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });

captcha
  .good({ id: "62376069684" })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
