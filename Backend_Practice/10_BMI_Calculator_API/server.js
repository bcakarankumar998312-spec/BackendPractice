const express = require("express");
const app = express();
const port = 3000;

app.get("/bmi/:weight/:height", (req, res) => {
  const weight = Number(req.params.weight);
  const height = Number(req.params.height);

  if (
    !Number.isNaN(weight) &&
    !Number.isNaN(height) &&
    weight > 0 &&
    height > 0
  ) {
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
      res.send(
        `Weight: ${weight}kg <br> Height: ${height}m <br> BMI: ${bmi.toFixed(2)} <br> Category: UnderWeight`,
      );
    } else if (bmi <25) {
      res.send(
        `Weight: ${weight}kg <br> Height: ${height}m <br> BMI: ${bmi.toFixed(2)} <br> Category: Normal Weight`,
      );
    } else if (bmi < 30) {
      res.send(
        `Weight: ${weight}kg <br> Height: ${height}m <br> BMI: ${bmi.toFixed(2)} <br> Category: OverWeight`,
      );
    } else{
      res.send(
        `Weight: ${weight}kg <br> Height: ${height}m <br> BMI: ${bmi.toFixed(2)} <br> Category: Obesity`,
      );
    }
  } else {
    res.send("Please valid data.");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
