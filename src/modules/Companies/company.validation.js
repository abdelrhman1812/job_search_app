import Joi from "joi";

const addCompanyValidation = Joi.object({
    companyName: Joi.string().min(3).max(12).required(),
    description: Joi.string().min(3).max(200).required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.string().required(),
    companyEmail: Joi.string().email().required(),
    companyHR: Joi.string().required()
});

const updateCompanyValidation = Joi.object({
    companyName: Joi.string().min(3).max(12).required(),
    description: Joi.string().min(3).max(200).required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),

    numberOfEmployees: Joi.string().required(),
    companyEmail: Joi.string().email().required(),
});

export { addCompanyValidation, updateCompanyValidation };

