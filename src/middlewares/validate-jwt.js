import jwt from "jsonwebtoken"
import Admin from "../admin/admin.model.js"

export const validateJWT = async (req, res, next) =>{
    let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la peticion"
            })
        }
    
    try {
        token = token.replace(/^Bearer\s+/, "")
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await Admin.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Usuario no existe en la DB"
            })
        }

        req.usuario = user
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
    next()
}