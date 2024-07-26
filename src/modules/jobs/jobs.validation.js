import Joi from "joi";

const addJopValidation = Joi.object({
    jobTitle: Joi.string().min(3).max(30).required(),
    jobLocation: Joi.string().required(),
    workingTime: Joi.string().required(),
    seniorityLevel: Joi.string().required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
});
const updateJopValidation = Joi.object({
    jobTitle: Joi.string().min(3).max(30),
    jobLocation: Joi.string(),
    workingTime: Joi.string(),
    seniorityLevel: Joi.string(),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
});


export { addJopValidation, updateJopValidation };

