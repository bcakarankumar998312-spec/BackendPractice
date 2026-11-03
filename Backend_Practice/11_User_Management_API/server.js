const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 87, name: "Karan", email: "karan@gmail.com", age: 21 },
  { id: 45, name: "Rahul", email: "rahul@gmail.com", age: 24 }
];


//Creating or adding new users
app.post("/users", (req, res)=>{
    const user = req.body;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const largestId = users.reduce((max, user)=>{
        if(max < user.id){
            return user.id;
        }
        return max;
    }, 0);

    const newId = largestId + 1;



    if(!user.name){
        return res.status(400).send("Name is required.");
    }
    if(user.age === undefined){        
        return res.status(400).send("Age is required.");
    }
    if(typeof user.age !== "number" || user.age <= 0){
        return res.status(400).send("Age must be a positive number.");
    }
    if(!user.email || typeof user.email !== "string"){
        return res.status(400).send("Email is required.");
    }
    if(!emailPattern.test(user.email)){
        return res.status(400).send("Invalid email format.");
    }

    const existingUser = users.find(existingUser => user.email === existingUser.email);


    if(existingUser){
        return res.status(400).send("email already exists.");
    }

    const newUser = {
        id: newId,
        ...user
    };

    users.push(newUser);
    res.status(201).send(users);
});


// see all users
app.get("/users", (req, res)=>{
    res.send(users);
});


//update in users
app.patch("/users/:id", (req, res)=>{
    
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id == userId);
    if(userIndex == -1){
        return res.status(404).send("User not found.");
    }

    const updateUser = {
        ...users[userIndex],
        ...req.body,
    };

    users[userIndex] = updateUser;

    res.send(updateUser);
    
});

//put user
app.put("/users/:id", (req, res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex == -1){
        return res.status(404).send("User not found.");
    }

    users[userIndex] = {id: userId, ...req.body};
    res.send(users);
});

//delete user
app.delete("/users/:id", (req, res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex == -1){
        return res.status(404).send("User not found.");
    }
    users.splice(userIndex, 1);
    res.send("User deleted successfully");
})


//get user by there id
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
}); 

// this is not for me