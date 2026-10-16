const express = require("express");
const app = express();
const port = 3000;

app.get("/analyzer/:num", (req, res) => {
  if (req.params.num.trim() === "") {
    return res.send("Please enter value.");
  } else {
    let num = Number(req.params.num);

    if (Number.isNaN(num)) {
      return res.send("This is not a number!");
    } else if (num === 0) {
      return res.send("This is zero!");
    } else if (num > 0) {
      if (num % 2 === 0) {
        return res.send(`${num} is a positive even number!`);
      } else {
        return res.send(`${num} is a positive odd number!`);
      }
    } else {
      if (num % 2 === 0) {
        return res.send(`${num} is a negative even number!`);
      } else {
        return res.send(`${num} is a negative odd number!`);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listing on ${port}`);
});
