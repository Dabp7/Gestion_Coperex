import { body, param } from "express-validator";
import { emailExists, nameExists, companyExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const createCompanyValidator = [
    validateJWT,
    body("nameCompany").notEmpty().withMessage("El nombre es requerido"),
    body("nameCompany").custom(nameExists  ),
    body("email").isEmail().withMessage("El correo del propietario es requerido y debe ser válido"),
    body("email").custom(emailExists),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    validarCampos,
    handleErrors
];

export const updateCompanyValidator = [
    param("idCompany", "No es un ID válido").isMongoId(),
    param("idCompany").custom(companyExists),
    validarCampos,
    handleErrors
]
