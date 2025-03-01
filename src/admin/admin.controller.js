import { hash } from "argon2";
import Admin from "./admin.model.js";

/**
 * @swagger
 * /admin/default:
 *   post:
 *     summary: Crea un administrador por defecto si no existe
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Administrador por defecto creado o ya existente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Administrador por defecto creado o ya existente
 *       500:
 *         description: Error al crear el administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el administrador: {error_message}
 */

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