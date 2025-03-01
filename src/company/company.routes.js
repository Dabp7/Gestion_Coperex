import { Router } from "express"
import { createCompany, getCompanyTrayectory, getCompanyCategory, getCompaniesAsc, getCompaniesDesc, updateCompany, generateCompanyReport } from "./company.controller.js"
import { createCompanyValidator, updateCompanyValidator} from "../middlewares/company-validators.js"

const router = Router()

/**
 * @swagger
 * /company/addCompany:
 *   post:
 *     summary: Agrega una nueva compañía
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Company Name"
 *               category:
 *                 type: string
 *                 example: "Technology"
 *               trayectory:
 *                 type: string
 *                 example: "10 years"
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compañía creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en la validación de los datos
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.post("/addCompany", createCompanyValidator, createCompany)

/**
 * @swagger
 * /company/getTrayectory/{trayectoryGet}:
 *   get:
 *     summary: Obtiene la trayectoria de una compañía
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: trayectoryGet
 *         schema:
 *           type: string
 *         required: true
 *         description: Trayectoria de la compañía
 *     responses:
 *       200:
 *         description: Trayectoria obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trayectory:
 *                   type: string
 *                   example: "10 years"
 *       404:
 *         description: Compañía no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compañía no encontrada
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.get("/getTrayectory/:trayectoryGet", getCompanyTrayectory) 

/**
 * @swagger
 * /company/getCategory/{category}:
 *   get:
 *     summary: Obtiene las compañías por categoría
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoría de la compañía
 *     responses:
 *       200:
 *         description: Compañías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Company Name"
 *                   category:
 *                     type: string
 *                     example: "Technology"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.get("/getCategory/:category", getCompanyCategory) 

/**
 * @swagger
 * /company/getCompany/A-Z:
 *   get:
 *     summary: Obtiene las compañías en orden ascendente
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Compañías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Company Name"
 *                   category:
 *                     type: string
 *                     example: "Technology"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.get("/getCompany/A-Z", getCompaniesAsc) 

/**
 * @swagger
 * /company/getCompany/Z-A:
 *   get:
 *     summary: Obtiene las compañías en orden descendente
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Compañías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Company Name"
 *                   category:
 *                     type: string
 *                     example: "Technology"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.get("/getCompany/Z-A", getCompaniesDesc) 

/**
 * @swagger
 * /company/editCompany/{idCompany}:
 *   put:
 *     summary: Edita una compañía existente
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCompany
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la compañía
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Company Name"
 *               category:
 *                 type: string
 *                 example: "Updated Category"
 *               trayectory:
 *                 type: string
 *                 example: "Updated Trayectory"
 *     responses:
 *       200:
 *         description: Compañía actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compañía actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en la validación de los datos
 *       404:
 *         description: Compañía no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compañía no encontrada
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.put("/editCompany/:idCompany", updateCompanyValidator, updateCompany) 

/**
 * @swagger
 * /company/report:
 *   get:
 *     summary: Genera un reporte de compañías
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *                   example: "Reporte de compañías"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor
 *                 error:
 *                   type: string
 *                   example: {error_message}
 */
router.get("/report", generateCompanyReport)

export default router
