const postModel = require("../models/post.model.js");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

const createPostController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // 🔹 Use static caption for now
    const caption = "New post ✨";

    // Upload to ImageKit
    const result = await uploadFile(req.file.buffer, `${uuidv4()}.jpg`);

    // Save post
    const post = await postModel.create({
      caption,
      image: result.url,
      user: req.user ? req.user._id : null, // safe fallback
    });

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPostController };
