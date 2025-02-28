'use strict'

import Company from "./company.model";  

export const createCompany = async(req, res) =>{
    try {
        const date = new Date();
        const { foundationYear, ...data } = req.body;
        const currentYear = date.getFullYear();

        if (foundationYear > date.getFullYear()){
            return res.status(404).json({ 
                success: false, 
                message: 'Año Invalido' 
            });
        }

        const yearsTrayectory = currentYear - foundationYear;

        const newCompany = new Company({
            ...data,
            yearsTrayectory 
        });

        await newCompany.save();

        res.status(200).json({
            success: true,
            newCompany
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear la compañia',
            error: err.message
        });
    }
};