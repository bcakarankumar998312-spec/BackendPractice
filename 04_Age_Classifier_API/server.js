const express = require("express");
const app = express();
const port = 3000;


app.get("/age/:num", (req, res)=>{
    if(req.params.num.trim() === ""){
        return res.send("Please enter value.");
    }
    else{
        let num = Number(req.params.num);
        if(Number.isNaN(num)){
            return res.send("Please enter a number.");
        }
        else if(num < 0){
            return res.send("Invalid Age.");
        }
        else if(num <= 13){
            return res.send("You are a child");
        }
        else if(num > 13 && num <=19){
            return res.send("You are a Teenager.");
        } 
        else if(num > 19 && num <= 59){
            return res.send("You are a Adult.");
        }
        else if(num > 59){
            return res.send("You are a senior citizen.");
        }
        
    }
})

app.listen(port, ()=> {
    console.log(`Server is listing on ${port}`);
})