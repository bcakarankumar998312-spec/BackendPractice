const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("Welcome to Backend World!");
});

app.get("/add/:num1/:num2", (req, res)=>{
    let result = Number(req.params.num1) + Number(req.params.num2);
    res.send(`${req.params.num1} + ${req.params.num2} = ${result}`);
});

app.get("/subtract/:num1/:num2", (req, res)=>{
    let result = Number(req.params.num1) - Number(req.params.num2);
    res.send(`${req.params.num1} - ${req.params.num2} = ${result}`);
});

app.get("/multiply/:num1/:num2", (req, res)=>{
    let result = Number(req.params.num1) * Number(req.params.num2);
    res.send(`${req.params.num1} X ${req.params.num2} = ${result}`);
});

app.get("/divide/:num1/:num2", (req, res)=>{
    
    if(req.params.num2 === "0"){
        return res.send("Cannot divide by zero!");
    };

    let result = Number(req.params.num1) / Number(req.params.num2);
    res.send(`${req.params.num1} / ${req.params.num2} = ${result}`);
});

app.listen(port, ()=>{
    console.log(`Server is listing on ${port}`);
})