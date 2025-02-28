import { body, param } from "express-validator";
//import { petExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
//import { hasRoles } from "./validate-roles.js";

export const createCompanyValidator = [
    validateJWT,
    body("nameCompany").notEmpty().withMessage("El nombre es requerido"),
    body("email").isEmail().withMessage("El correo del propietario es requerido y debe ser válido"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    validarCampos,
    handleErrors
];
