const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  try {
    const response = await imagekit.upload({
      file,
      fileName,
      folder: "ai-social",
    });

    return response;
  } catch (error) {
    console.error("ImageKit upload error:", error.message);
    throw error;
  }
}

module.exports = uploadFile;
