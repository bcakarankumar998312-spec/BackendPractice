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



    if(!user.name || typeof user.name!=="string" || !user.name.trim()){
        return res.status(400).send("Name is required.");
    }
    
    if(user.age === undefined){        
        return res.status(400).send("Age is required.");
    }
    if(typeof user.age !== "number" || user.age <= 0 || !Number.isFinite(user.age)){
        return res.status(400).send("Age must be a positive number.");
    }
    if(!user.email || typeof user.email !== "string"){
        return res.status(400).send("Email is required.");
    }

    const email = user.email.trim().toLowerCase();
    if(!emailPattern.test(email)){
        return res.status(400).send("Invalid email format.");
    }

    const existingUser = users.find(existingUser => email === existingUser.email.toLocaleLowerCase());


    if(existingUser){
        return res.status(400).send("email already exists.");
    }

    const newUser = {
        ...user,
        id: newId,
        email: email
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
// Project 11 — Remaining Roadmap
// Step	Feature	Status
// 1	GET all users	✅
// 2	GET user by ID	🔄 Improve
// 3	POST with validation	✅ Basic validation
// 4	PATCH with validation	🔄
// 5	PUT with validation	🔄
// 6	DELETE user	✅
// 7	Search users using req.query	⏳
// 8	Pagination	⏳
// 9	Centralized error handling	⏳
// 10	Authentication and authorization	⏳
// 11	Password hashing with bcrypt	⏳
// 12	JWT authentication	⏳
// 13	MongoDB integration	⏳