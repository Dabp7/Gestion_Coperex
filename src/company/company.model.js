import { Schema, model } from "mongoose";

const companySchema = new Schema({
    nameCompany: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    foundationYear: {  
        type: Number,
        required: [true, "Foundation year is required"]
    },
    impactLevel: {
        type: String,
        required: [true, "Impact level is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
}, {
    versionKey: false,
    timestamps: true 
});

export default model("Company", companySchema);