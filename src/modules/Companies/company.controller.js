import ApplicationModel from "../../../DataBase/models/application.model.js"
import CompanyModel from "../../../DataBase/models/company.model.js"
import JobsModle from "../../../DataBase/models/jobsmodel.js"
import AppError from "../../utils/appError.js"
import messages from "../../utils/messages.js"


/* ========= Add Company ========= */

const addCompany = async (req, res, next) => {

    const { companyName, description, address, numberOfEmployees, companyHR, companyEmail, industry } = req.body

    /* Check Comapny Exists */

    const companyExists = await CompanyModel.findOne({ $or: [{ companyEmail }, { companyName }] });

    if (companyExists) return next(new AppError(messages.company.companyIsExist), 409)

    /* Preper Data */

    const company = new CompanyModel({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR
    })


    /* Save Data */
    const createdCompany = await company.save()

    return res.status(200).json({ message: messages.company.successfullyAddCompany, company: createdCompany })
}

/* =========  Update Comapny  ========= */

const updateCompany = async (req, res, next) => {

    const { companyName, companyEmail } = req.body;
    const hrId = req.authUser._id;
    const companyId = req.params.id;

    /* Find company by id from params */

    const company = await CompanyModel.findById(companyId);
    if (!company) return next(new AppError(messages.company.notFound, 404));


    /* Cheack owner of company */

    if (company.companyHR.toString() !== hrId.toString()) {
        return next(new AppError(messages.company.ownerUpdate, 403));
    }

    /* check Company exists */

    const companyExists = await CompanyModel.findOne({
        $or: [
            { companyEmail },
            { companyName }
        ],
        _id: { $ne: companyId }
    });
    if (companyExists) return next(new AppError(messages.company.companyIsExist, 409));


    /* Update company */
    const companyUpdated = await CompanyModel.findByIdAndUpdate(
        companyId,
        req.body,
        { new: true }
    );

    res.status(200).json({ message: messages.company.update, company: companyUpdated });

};



/* =========  Delete Comapny  ========= */

const deleteCompany = async (req, res, next) => {
    const hrId = req.authUser._id;
    const companyId = req.params.id;

    /* Find company by id from params */

    const company = await CompanyModel.findById(companyId);
    if (!company) return next(new AppError(messages.company.notFound, 404));

    /* Cheack owner of company */

    if (company.companyHR.toString() !== hrId.toString()) {
        return next(new AppError(messages.company.ownerDeleted, 403));
    }


    /* Find Jobs related Company */

    const jobs = await JobsModle.find({ addedBy: companyId });
    const jobIds = jobs.map(job => job._id);

    /* delete applications related Jobs */

    await ApplicationModel.deleteMany({ jobId: { $in: jobIds } });

    /* delete jobs related company */

    await JobsModle.deleteMany({ addedBy: companyId });

    /* Deleted Company */

    await CompanyModel.findByIdAndDelete(companyId);

    res.status(200).json({ message: messages.company.deleted })
}



/* =========  Get company data   ========= */

const getCompanyData = async (req, res, next) => {

    const hrId = req.authUser._id;
    const companyId = req.params.id;

    /* Find company by id from params */


    const company = await CompanyModel.findById(companyId);
    if (!company) return next(new AppError(messages.company.notFound, 404));

    /* Cheack owner of company */

    if (company.companyHR.toString() !== hrId.toString()) {
        return next(new AppError(messages.company.getCampany, 403));
    }
    res.status(200).json({ message: messages.company.successfully, company });


}



/* =========  Search for a company with a name   ========= */

const searchForCompanyByName = async (req, res, next) => {

    const name = req.params.name;


    const companies = await CompanyModel.find({ companyName: { $regex: name } });

    res.json({ message: messages.company.getCampany, companies })

};


/* Get all applications for specific Jobs
   each company Owner can take a look at the applications for his jobs only, he has no access to other companies’ application
   return each application with the user data, not the userId
   apply authorization with role (  Company_HR ) */


const getApplicationForCompany = async (req, res, next) => {

    const hrd = req.authUser._id;
    console.log(hrd);

    /* Find Company */
    const company = await CompanyModel.findOne({ companyHR: hrd });
    console.log(company);

    if (!company) return next(new AppError(messages.company.notFound, 404))

    /* Find Jobs related Company */
    const jobs = await JobsModle.find({ addedBy: company._id });
    if (!jobs.length) return next(new AppError(messages.jobs.notFound), 404)

    const jobIds = jobs.map(job => job._id);

    /* Find applications related Company and  jobs */


    const applications = await ApplicationModel.find({ jobId: { $in: jobIds } })
        .populate('userId').populate('jobId');

    res.status(200).json(applications);
};

export {
    addCompany,
    deleteCompany, getApplicationForCompany, getCompanyData,
    searchForCompanyByName,
    updateCompany
}

