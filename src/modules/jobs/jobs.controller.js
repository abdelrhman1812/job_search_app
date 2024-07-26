import CompanyModel from "../../../DataBase/models/company.model.js";
import JobsModle from "../../../DataBase/models/jobsmodel.js";
import AppError from "../../utils/appError.js";
import messages from "../../utils/messages.js";





/* ==============  Add Job ============== */

const addJob = async (req, res, next) => {
    const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;

    const userRole = req.authUser.role;

    const userId = req.authUser._id; // I need  Hr  To Get THe companyId To Add Job

    /* Check Again Authorization  */

    if (userRole !== 'company_hr') {
        return next(new AppError(messages.user.notAuthorized, 403));
    }

    /* Find Company By Hr in req authorization  to Get Companu Id  */

    const company = await CompanyModel.findOne({ companyHR: userId });
    if (!company) return next(new AppError(messages.company.notFound, 404))



    /*  Save Created  */

    const job = new JobsModle({
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy: company._id,
    });

    /*  Save Created Job */
    const createdJob = await job.save()

    res.status(200).json({ message: messages.jobs.successfullyAddJonb, job: createdJob })

}



/* ==============  Update Job ============== */
const updateJob = async (req, res, next) => {
    const JobId = req.params.id


    /* Find Job To Make Update */

    const job = await JobsModle.findById(JobId);
    if (!job) return next(new AppError(messages.jobs.notFound, 404))


    /*  Update  */

    const jobUpdated = await JobsModle.findByIdAndUpdate(
        JobId,
        req.body,
        { new: true }
    );

    res.status(200).json({ message: messages.jobs.update, Job: jobUpdated });

}



/* ==============  Update Job ============== */
const deleteJob = async (req, res, next) => {
    const JobId = req.params.id


    /* Find Job To Make Update */

    const job = await JobsModle.findById(JobId);
    if (!job) return next(new AppError(messages.jobs.notFound, 404))


    /*  Delete Job  */

    await JobsModle.findByIdAndDelete(JobId);

    res.status(200).json({ message: messages.jobs.deleted });


}


/* ==============  Get all Jobs with their company’s information ============== */


const getJobWithTheirCompany = async (req, res, next) => {


    /* authorization User , Company_HR  */

    const jobs = await JobsModle.find().populate('addedBy')

    res.status(200).json({ message: messages.jobs.successfully, jobs })
}

/* ==============  Get all Jobs for a specific company ============== */

const getAllJobsForAspecificCompany = async (req, res, next) => {

    /* authorization User , Company_HR  */
    const { companyName } = req.query;
    console.log(companyName)

    /* Find Company */

    const company = await CompanyModel.findOne({ companyName });

    if (!company) return next(new AppError(messages.company.notFound), 404)

    /* Find Jobs */

    const jobs = await JobsModle.find({ addedBy: company._id })

    res.status(200).json({ message: messages.jobs.successfully, jobs })
}


/* ==============  Get all Jobs that match the following filters ============== */

const getJobsWithFilters = async (req, res, next) => {

    /*  Get I Need Filter from Query  */
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

    /* This is obj hold any key in query */

    let filter = {};

    if (workingTime) {
        filter.workingTime = workingTime;
    }
    if (jobLocation) {
        filter.jobLocation = jobLocation;
    }
    if (seniorityLevel) {
        filter.seniorityLevel = seniorityLevel;
    }
    if (jobTitle) {
        filter.jobTitle = { $regex: jobTitle, $options: 'i' };
    }
    if (technicalSkills) {
        filter.technicalSkills = { $in: technicalSkills.split(',') };
    }

    const jobs = await JobsModle.find(filter).populate('addedBy');

    res.status(200).json({ message: messages.jobs.successfully, jobs, success: true })

}


export { addJob, deleteJob, getAllJobsForAspecificCompany, getJobWithTheirCompany, getJobsWithFilters, updateJob };



