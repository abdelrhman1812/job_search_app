import mongoose, { Schema, model } from "mongoose";
import { jobLocations, seniorityLevels, workingTimes } from "../../src/utils/enum.js";

const jobSchema = new Schema({

    jobTitle: {
        type: String,
        required: true
    },

    jobLocation: {
        type: String,
        enum: Object.values(jobLocations),
        default: jobLocations.ONSITE,
        required: true,


    },

    workingTime: {
        type: String,
        enum: Object.values(workingTimes),
        default: workingTimes.FULL_TIME,
        required: true,


    },

    seniorityLevel: {
        type: String,
        enum: Object.values(seniorityLevels),
        default: seniorityLevels.MID_LEVEL,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    technicalSkills: {
        type: [String],
        required: true,
    },
    softSkills: {
        type: [String],
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },


})

const JobsModle = model('Job', jobSchema)

export default JobsModle