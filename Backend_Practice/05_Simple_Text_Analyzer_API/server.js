const express = require("express");
const app = express();
const port = 3000;


app.get("/analyze/:text", (req, res)=>{
    let text = req.params.text;
    let total = text.length;
    let letters = (text.match(/[a-z]/gi)).length;
    let digits = (text.match(/[0-9]/g)).length;
    let specialChar = text.match(/[^a-zA-Z0-9\s]/g)?.length || 0;
    res.send(`Total: ${total}<br> Letters: ${letters}<br> Digits: ${digits}<br> SpecialChar: ${specialChar}`);
})

app.listen(port, ()=>{
    console.log(`Server is listing on ${port}`);
})