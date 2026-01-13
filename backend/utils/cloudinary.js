import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"




// Configuration
 const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};



    const uploadOnCloudnary = async (localFilePath) =>{
        try {
            if (!localFilePath) {
                return null;
                
                
            }
                configureCloudinary();
            
            
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
            })
            
            console.log("File uploaded in cloudinary. File path is: " + response.url);
            //Once the file upload in cloudinary, we shoud delete it from our server
            console.log("hello from mehebub");
            fs.unlinkSync(localFilePath);
            return response;

        } catch (error) {
            console.log("Cloudinary upload error:", error);
            fs.unlinkSync(localFilePath);
            console.log("hello");
            return null
        }
    }



    const deletFromCloudinary = async (publicId) =>{
        try {
            const result = await cloudinary.uploader.destroy(publicId)
            console.log("Deleted from cloudinary, public Id", publicId);
            
        } catch (error) {
            console.log("Error deleting from cloudinary ",error);
            return null
            
        }
    }
    export {uploadOnCloudnary , deletFromCloudinary};