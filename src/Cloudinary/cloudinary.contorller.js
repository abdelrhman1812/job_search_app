import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


/* ========= Config ========= */

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



/* ========= Upload File ========= */
const cloudinaryUploadFile = async (filePath) => {
    try {
        const data = await cloudinary.uploader.upload(filePath, {
            resource_type: "raw",
            access_mode: "public"

        });
        return data;
    } catch (error) {
        throw error;
    }
};


export { cloudinaryUploadFile };

