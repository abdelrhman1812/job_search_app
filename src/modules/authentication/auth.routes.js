import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import validate from "../../middleware/validation.js";
import { signIn, signUp, verifyEmail } from "./auth.controller.js";
import { signinValidation, signupValidation } from "./auth.validation.js";

const authRouter = Router()

/* Sing IN */

authRouter.post('/sign-up', validate(signupValidation), catchError(signUp))

/* Verify Account */

authRouter.get('/verify/:token', catchError(verifyEmail))

/* Sing Up */

authRouter.post('/sign-in', validate(signinValidation), signIn)

export default authRouter