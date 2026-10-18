import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        min:0,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true,
        min:1
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

userSchema.pre("save", async function () {
    if(this.isModified("password")){
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
});

const User = mongoose.model("User", userSchema);
export default User;