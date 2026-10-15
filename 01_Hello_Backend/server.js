const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send("Welcome to Backend World");
})

app.get("/about", (req,res)=>{
    res.send("This is my About page");
})

app.get("/contact", (req, res)=> {
    res.send("This is Contact page")
})

app.listen(port, ()=>{
    console.log(`server is listing on ${port}`);
});