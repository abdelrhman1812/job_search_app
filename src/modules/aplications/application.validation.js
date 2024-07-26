import Joi from "joi";

const applyTojopValidation = Joi.object({
    file: Joi.object({ originalName: Joi.string().required(), }),
    jobId: Joi.string().required(),
    userTechSkills: Joi.string().required(),
    userSoftSkills: Joi.string().required(),
});

export { applyTojopValidation };
