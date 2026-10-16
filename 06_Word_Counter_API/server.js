const express = require("express");
const app = express();
const port = 3000;

app.get("/count/:text", (req, res)=> {
    let sentance = (req.params.text).trim();
    if(sentance === ""){
        return res.send("0")
    }
    let wordCount = (sentance.split(/\s+/)).length;
    res.send(`${wordCount}`);
})

app.listen(port, ()=>{
    console.log(`Server is listing on ${port}`);
})