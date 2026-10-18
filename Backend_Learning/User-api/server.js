import session from "express-session";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;



class AppError extends Error{
    constructor(message, status){
        super(message);
        this.status = status;
    }
}

app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET
}));

const isAuthenticated = (req, res, next) => {
    if(req.session.userId === undefined){
        const err = new AppError("Please login first", 401);
        return next(err);
    }
    next();
};

const authorizeUser = (req, res, next) => {
    if(req.session.userId === Number(req.params.id)){
        return next();
    }
    
    return next(new AppError("Your are not allowed to access this user", 403));

};




app.get("/users", isAuthenticated, async(req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.send(users);
    } catch (err){
        next(err);
    }
})

app.get("/", (req,res)=>{
    res.send("welcome to user-api");
})

app.get("/users/:id", isAuthenticated, authorizeUser, async(req, res, next)=>{
    try {
    
    const user = await User.findOne({id: Number(req.params.id)}).select("-password");
    if(user===null){
      const err = new AppError("user not found", 404);
      return next(err);
    }
    
    
    
    res.send(user);
} catch (err){
    next(err);
}
    
    
    
});

app.get("/search", isAuthenticated,  async(req, res, next)=>{
    try{
        const name = req.query.name;
        const user = await User.findOne({name: name}).select("-password");
        if(user===null){
            const err = new AppError("User not found through name", 404);
            return next(err);
        }
        res.send(user);
    } catch (err){
        next(err);
    }
});

const validateUser = (req, res, next) => {
    const newUser = req.body;

    if(newUser.id === undefined || typeof(newUser.id) !== "number"){
        const err =new AppError("id is missing or not a number, please check!", 400 );
        return next(err);
    }
    else if(newUser.name === undefined || newUser.name === ""){
        const err = new AppError("name is missing", 400);
        return next(err);
    }
    else if(newUser.age === undefined || typeof(newUser.age) !== "number" || newUser.age <= 0){
        const err = new AppError("age is missing or not a number, please check!", 400);
        return next(err);
    }
    else if(newUser.role === undefined || newUser.role === ""){
       const err = new AppError("role is missing", 400);
       return next(err);
    }
    else if(newUser.password === undefined){
        const err = new AppError("password is missing", 400);
        return next(err);
    }
    
    next();
};


app.post("/users", validateUser, async (req, res, next) => {
    try{
        const newUser = await User.create(req.body);
        const user = newUser.toObject();
        delete user.password;
        res.status(201).send(user);
    } catch (err){
        next(err);
        }
    });
    

app.post("/login", async(req, res, next)=>{
    const {id, password} = req.body;
    const user = await User.findOne({id: Number(id)});
    if(user === null){
        const err = new AppError("User not found", 404);
        return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        const err = new AppError("Invalid Password!", 401);
        return next(err);
    }

    req.session.userId = user.id;
    console.log(req.session);
    res.send("Login successful");
});



app.get("/profile",isAuthenticated, async(req,res,next)=>{
    const id = req.session.userId;
    const user = await User.findOne({id: Number(id)}).select("-password");
    res.send(user);
});

app.post("/logout", (req, res, next) => {
    req.session.destroy(()=>{
        res.send("now you are logOut from this application!");
    });
});




const validateUserUpdate = (req, res, next) => {
    const allowedFields = ["name", "age", "role", "password"];
    const fields = Object.keys(req.body);

    if(fields.length === 0){
        const err = new AppError("No fields to update", 400);
        return next(err);
    }

    const allAllowed = fields.every((field) => allowedFields.includes(field));

    if(!allAllowed){
        const err = new AppError("Invalid field in request", 400);
        return next(err);
    }

    if(req.body.name !== undefined && (typeof req.body.name !== "string" || req.body.name === "")){
        const err = new AppError("name cannot be empty", 400);
        return next(err);
    }

    if(req.body.age !== undefined && (typeof req.body.age !== "number" || req.body.age <= 0)){
        const err = new AppError("age must be a positive number", 400);
        return next(err);
    }

    if(req.body.role !== undefined && (typeof req.body.role !== "string" || req.body.role === "")){
        const err = new AppError("role cannot be empty", 400);
        return next(err);
    }

    if(req.body.password !== undefined && (typeof req.body.password !== "string" || req.body.password === "")){
        const err = new AppError("Password cannot be empty or just number only", 400);
        return next(err);
    }

    next();
}

app.patch("/users/:id",isAuthenticated, authorizeUser, validateUserUpdate, async(req, res, next)=>{
    try{
        const user = await User.findOne({id : Number(req.params.id)});
        if(user === null){
        const err = new AppError("User not found", 404);
        return next(err);
        }

        for(const field of Object.keys(req.body)){
            user[field] = req.body[field];
        }
        await user.save();

        const updateUser = user.toObject();
        delete updateUser.password;
        
        res.send(updateUser);
    }catch (err){
        next(err);
    }
    
});

app.delete("/users/:id",isAuthenticated, authorizeUser, async(req,res,next) => {
    try{
        const user = await User.findOneAndDelete({id: Number(req.params.id)});

        if(user === null){
        const err = new AppError("User not found", 404);
        return next(err);
        }

        res.status(204).send();
    }catch(err){
        next(err);
    }
    
})




app.use((err, req, res, next) => {
    
    if(err.name === "ValidationError"){
        return res.status(400).send(err.message);
    }

    if(err.code === 11000){
        return res.status(400).send("User ID already exists");
    }
    res.status(err.status || 500).send(err.message);
    
});

mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("MongoDB connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection error:", err);
    });



app.listen(port ,()=>{
    console.log(`Server is listening on ${port}`);
    
}); 