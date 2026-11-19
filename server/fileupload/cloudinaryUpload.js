const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (
  fileBuffer,
  folder = "mern-products",
  resourceType = "image",
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
