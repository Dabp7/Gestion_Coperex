import Company from "../company/company.model.js";


export const nameExists = async (nameCompany = "") => {
    const existe = await Company.findOne({nameCompany})
    if(existe){
        throw new Error(`El nombre: ${nameCompany} ya está registrado`)
    }
}

export const emailExists = async (email = "") => {
    const existe = await Company.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const companyExists = async (idCompany = " ") => {
    const existe = await Company.findById(idCompany)
    if(!existe){
        throw new Error("No existe la empresa con el ID proporcionado")
    }
}

