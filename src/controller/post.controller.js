// const postModel = require("../models/post.model.js");
// const generateCaption = require("../service/ai.service.js");
// constgenerateCaption = require("../service/ai.service.js");

// const createPostController = async (req, res) => {
//   const file = req.file;
//   console.log("File recieved:", file);

//   const base64ImageFile = new Buffer.from(file.buffer).toString("base64");

//   const caption = await generateCaption(base64ImageFile);
//   console.log("Generated caption:", caption);
//   res.json({
//     caption
//   })
// };

// module.exports = { createPostController };

const { generateCaption } = require("../service/ai.service");

const createPostController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const base64Image = req.file.buffer.toString("base64");
    const caption = await generateCaption(base64Image, req.file.mimetype);

    res.json({
      success: true,
      caption,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPostController };
