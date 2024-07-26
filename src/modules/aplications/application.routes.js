import { Router } from "express";
import auth from "../../middleware/auth.js";
import catchError from "../../middleware/catchError.js";
import fileUpload from "../../middleware/fileUpload.js";
import validate from "../../middleware/validation.js";
import verifyToken from "../../middleware/verifyToken.js";
import { roles } from "../../utils/enum.js";
import applyToJob from "./application.controller.js";
import { applyTojopValidation } from "./application.validation.js";

const applicationRouter = Router()

/* Apply Job */

applicationRouter.post('/', verifyToken, auth(roles.USER), fileUpload.single("file"), validate(applyTojopValidation), catchError(applyToJob))

export default applicationRouter