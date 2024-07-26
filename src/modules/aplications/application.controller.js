import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ApplicationModel from '../../../DataBase/models/application.model.js';
import JobsModle from '../../../DataBase/models/jobsmodel.js';
import { cloudinaryUploadFile } from '../../Cloudinary/cloudinary.contorller.js';
import AppError from '../../utils/appError.js';
import messages from '../../utils/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const applyToJob = async (req, res, next) => {

    /* Get Data */

    const { jobId, userTechSkills, userSoftSkills } = req.body;
    const userId = req.authUser._id;

    /* Check if job exists */

    const job = await JobsModle.findById(jobId);

    if (!job) return next(new AppError(messages.jobs.notFound, 404));

    /* Check if file is provided */

    if (!req.file) return next(new AppError(messages.application.notFoundFile));

    /* Get the file path */

    const filePath = path.join(__dirname, `../../filesUpload/${req.file.filename}`);

    /* Upload the file to Cloudinary */
    const cloudinaryResult = await cloudinaryUploadFile(filePath);
    console.log(cloudinaryResult)

    /*Prepare  And Create a new application */

    const application = new ApplicationModel({
        jobId,
        userId,
        userTechSkills: userTechSkills.split(','),
        userSoftSkills: userSoftSkills.split(','),
        userResume: cloudinaryResult.secure_url
    });

    /* Save the application to the database */
    const createdApplication = await application.save();

    /* Respond with the created application */

    fs.unlinkSync(filePath);
    res.status(201).json({
        message: messages.application.successfullyApplied,
        application: createdApplication
    });

};

export default applyToJob;
