import express from "express";
const app = express();
const port = 3000;

app.get("/convert/:unit/:value", (req, res)=>{
    const unit = req.params.unit;
    const value = Number(req.params.value);
    if(unit === "kilometer" && !Number.isNaN(value) ){
        let miles = 0.6 * value;
        res.send(`${value} Kilometer = ${miles}Miles.`);
    }
    else if(unit === "miles" && !Number.isNaN(value) ){
        let kilometer = 1.6 * value;
        res.send(`${value} Miles: ${kilometer} Kilometer.`);
    }
    else{
        res.send("Please enter valid data.")
    }
});


app.listen(port, ()=>{
    console.log(`Server is listing on ${port}`);
})