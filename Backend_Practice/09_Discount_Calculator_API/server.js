const express = require("express");
const app = express();
const port = 3000;

app.get("/discount/:price/:percentage", (req, res) => {
  const orgPrice = Number(req.params.price);
  const percentage = Number(req.params.percentage);
  if (
    !Number.isNaN(orgPrice) &&
    !Number.isNaN(percentage) &&
    orgPrice >= 0 &&
    percentage >= 0 &&
    percentage <= 100
  ) {
    const discount = (orgPrice / 100) * percentage;
    const price = orgPrice - discount;
    res.send(
      `Original price : ${orgPrice}<br> Discount Percentage : ${percentage}<br> Discount Price : ${price}<br> Discount : ${discount}`,
    );
  } else {
    res.send("Please enter valid data.");
  }
});

app.listen(port, () => {
  console.log(`Server is listing on ${port}`);
});
