import cloudinary from "cloudinary";

// Cloudinary configuration
//@ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Replace with your Cloudinary API secret
});

// Function to upload an image to Cloudinary
export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    // Upload the image
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "your-folder-name", // Optional: Specify a folder in Cloudinary
    });

    // Return the URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};
