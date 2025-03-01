'use strict'

import Company from "../company/company.model.js"; 
import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const createCompany = async(req, res) =>{
    try {   
        const date = new Date();
        const { foundationYear, ...data } = req.body;
        const currentYear = date.getFullYear();

        if(foundationYear > currentYear) {
            return res.status(400).json({ 
                success: false, 
                message: 'Año inválido' 
            });
        }

        const yearsTrayectory = currentYear - foundationYear;

        const newCompany = new Company({
            ...data,
            foundationYear, 
            trayectory: yearsTrayectory
        });

        await newCompany.save();


        res.status(200).json({
            success: true,
            newCompany
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear la empresa',
            error: err.message
        });
    }
};



export const getCompanyTrayectory = async(req, res) =>{
    try{
        const { trayectoryGet }= req.params;
        const { limite = 5, desde = 0} = req.query
        const query = { trayectory: trayectoryGet }
  
        const [total, company] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        
        return res.status(200).json({
            success: true,
            total,
            company
        })
  
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        })
    }
  }



  export const getCompanyCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const company = await Company.find({category})

        if(!company){
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada'
            })
        }


        return res.status(200).json({
            success: true,
            total: company.length,
            company
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        });
    }
};

export const getCompaniesAsc = async (req, res) => {
    try {
        const companies = await Company.find().sort({ nameCompany: 1 });

        if (!companies) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron empresas"
            });
        }

        return res.status(200).json({
            success: true,
            total: companies.length,
            companies
        });

    }catch (err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        });
    }
};


export const getCompaniesDesc = async (req, res) => {
    try {
        const companies = await Company.find().sort({ nameCompany: -1 });

        if (!companies) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron empresas"
            });
        }

        return res.status(200).json({
            success: true,
            total: companies.length,
            companies
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        });
    }
};


export const updateCompany = async(req, res) =>{
    try{
        const { idCompany } = req.params
        const data = req.body;

        const company  = await Company.findByIdAndUpdate(idCompany, data, {new: true})
  
        return res.status(200).json({
            success: true,
            message: "Empresa actualizada",
            company
        })
  
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la empresa",
            error: err.message
        })
    }
  }


  export const generateCompanyReport = async(req, res) => {
    try {
        const companies = await Company.find();

        if (companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay empresas registradas para generar un reporte"
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte de Empresas");

        
        worksheet.columns = [
            { header: "Nombre de la Empresa", key: "nameCompany", width: 30 },
            { header: "Correo Electrónico", key: "email", width: 30 },
            { header: "Año de Fundación", key: "foundationYear", width: 15 },
            { header: "Nivel de Impacto", key: "impactLevel", width: 20 },
            { header: "Categoría", key: "category", width: 20 },
            { header: "Trayectoria", key: "trayectory", width: 15 }
        ];

        
        companies.forEach(company => {
            worksheet.addRow({
                nameCompany: company.nameCompany,
                email: company.email,
                foundationYear: company.foundationYear,
                impactLevel: company.impactLevel,
                category: company.category,
                trayectory: company.trayectory
            });
        });

       
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFF" } };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "0073e6" }
            };
            cell.alignment = { horizontal: "center" };
        });

        
        const filePath = path.join(__dirname, "../../public/reports/reporte_empresas.xlsx");


        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            success: true,
            message: "Reporte generado exitosamente",
            filePath
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al generar el reporte",
            error: err.message
        });
    }
};


