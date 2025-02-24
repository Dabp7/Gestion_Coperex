import { hash } from "argon2";
import Admin from "./admin.model.js";


export const adminDefaultCreated = async (req, res) => {
    try{

        const defaultAdmin = await Admin.findOne({ email: "Dabp@gmail.com" });
        const encryptedPassword = await hash("dBerc1an!")

        if(!defaultAdmin){
            const newAdmin = new Admin({
                username: "Dabpp",
                email: "Dabp@gmail.com",
                password: encryptedPassword
            })
    
            await newAdmin.save();
        }

    }catch(err){
        return console.log(`Error al crear el administrador: ${err.message}`)
    }
};