import { Schema, model} from "mongoose";

const adminSchema = Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
},
{
    versionKey: false,
    timeStamps: true
})


export default model("Admin", adminSchema)