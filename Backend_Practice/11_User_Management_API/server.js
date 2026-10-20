const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 87, name: "Karan", email: "karan@gmail.com", age: 21 },
  { id: 45, name: "Rahul", email: "rahul@gmail.com", age: 24 }
];


app.post("/users", (req, res)=>{
    const user = req.body;
    users.push(user);
    res.send(users);
});


app.get("/users", (req, res)=>{
    res.send(users);
});


app.patch("/users/:id", (req, res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id == userId);
})



app.get("/users/:id", (req, res)=>{
    const id = req.params.id;
    users.forEach(user=>{
        if(user.id == id){
            res.send(user);
        };
    });
});


app.listen(port, ()=>{
    console.log(`Server is listing on ${port}`);
})