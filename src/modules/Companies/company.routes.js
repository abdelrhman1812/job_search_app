import { Router } from "express";
import auth from "../../middleware/auth.js";
import catchError from "../../middleware/catchError.js";
import validate from "../../middleware/validation.js";
import verifyToken from "../../middleware/verifyToken.js";
import { roles } from "../../utils/enum.js";

import { addCompany, deleteCompany, getApplicationForCompany, getCompanyData, searchForCompanyByName, updateCompany } from "./company.controller.js";
import { addCompanyValidation, updateCompanyValidation } from "./company.validation.js";

const companyRouter = Router()

companyRouter.post('/', verifyToken, auth(roles.COMPANY_HR), validate(addCompanyValidation), catchError(addCompany))

/*  Update Company */

companyRouter.put("/:id", verifyToken, auth(roles.COMPANY_HR), validate(updateCompanyValidation), catchError(updateCompany))

/*  Delete Company */


companyRouter.delete("/:id", verifyToken, auth(roles.COMPANY_HR), catchError(deleteCompany))

/* =========  Get company data   ========= */

companyRouter.get("/:id", verifyToken, auth(roles.COMPANY_HR), catchError(getCompanyData))


/* =========  Search for a company with a name   ========= */

companyRouter.get("/search/:name", verifyToken, auth([roles.COMPANY_HR, roles.USER]), catchError(searchForCompanyByName))


/* =========  Get all applications for specific Jobs   ========= */
companyRouter.get("/company/application", verifyToken, auth(roles.COMPANY_HR), getApplicationForCompany)

export default companyRouter