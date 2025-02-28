import { Router } from "express"
import { createCompany } from "./company.controller.js"
import { createCompanyValidator } from "../middlewares/company-validators.js"

const router = Router()

router.post("/addCompany", createCompanyValidator, createCompany)


export default router
