import { Router } from "express";
import auth from "../../middleware/auth.js";
import catchError from "../../middleware/catchError.js";
import validate from "../../middleware/validation.js";
import verifyToken from "../../middleware/verifyToken.js";
import { roles } from "../../utils/enum.js";

import { addJob, deleteJob, getAllJobsForAspecificCompany, getJobsWithFilters, getJobWithTheirCompany, updateJob } from "./jobs.controller.js";
import { addJopValidation, updateJopValidation } from "./jobs.validation.js";
const jobsRouter = Router()

/* ==============  Add Job ============== */

jobsRouter.post('/', verifyToken, auth(roles.COMPANY_HR), validate(addJopValidation), catchError(addJob))

/* ==============  Update Job ============== */

jobsRouter.put('/:id', verifyToken, auth(roles.COMPANY_HR), validate(updateJopValidation), catchError(updateJob))

/* ==============  Delete Job ============== */

jobsRouter.delete('/:id', verifyToken, auth(roles.COMPANY_HR), catchError(deleteJob))


/* ==============  Get all Jobs with their company’s information ============== */

jobsRouter.get('/', verifyToken, auth([roles.COMPANY_HR, roles.USER]), catchError(getJobWithTheirCompany))


/* ==============  Get all Jobs for a specific company ============== */

jobsRouter.get('/company', verifyToken, auth([roles.COMPANY_HR, roles.USER]), catchError(getAllJobsForAspecificCompany))

/* ============== Get all Jobs that match the following filters ==============  */

jobsRouter.get('/job-filter', verifyToken, auth([roles.COMPANY_HR, roles.USER]), catchError(getJobsWithFilters))


export default jobsRouter

