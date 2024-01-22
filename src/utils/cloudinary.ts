import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const cloudUpload = async (file: any, folder:any) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result: any) => {
            resolve({
                url: result.url,
                id: result.public_id,
            });
        },
            {
                folder: folder,
        });
    });
}