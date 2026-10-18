const express = require("express");
const app = express();
const port = 3000;

app.get("/convert/:unit/:value", (req, res) => {
  let value = Number(req.params.value);
  let unit = req.params.unit;
  if (!Number.isNaN(value) &&  (unit ==="celsius" || unit ==="fahrenheit")) {
    if (unit === "celsius") {
      let fahrenheit = (value * 9) / 5 + 32;
      res.send(`Fahrenheit = ${fahrenheit}`);
    } else{
      let celsius = ((value - 32) * 5) / 9;
      res.send(`Celcius = ${celsius}`);
    }
  } else {
    res.send("Please enter valid data.");
  }
});

app.listen(port, () => {
  console.log(`Server is listing on ${port}`);
});
