import { model, Schema } from "mongoose";



const companySchema = new Schema({

    companyName: {
        type: String,
        unique: true,
        required: true,
    },

    description: {

        type: String,
        required: true,
    },

    industry: {

        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
    },
    companyHR: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})


const CompanyModel = model('Company', companySchema)

export default CompanyModel