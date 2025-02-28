'use strict'

import Company from "./company.model.js";  


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

        const savedCompany = await newCompany.save();


        res.status(200).json({
            success: true,
            savedCompany
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear la empresa',
            error: err.message
        });
    }
};