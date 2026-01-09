// const express = require("express");
// const authMiddleware = require("../middleware/middleware.js");
// const router = express.Router();
// const multer = require("multer");
// const createPostController = require("../controller/post.controller.js");

// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/", authMiddleware, upload.single("image"), createPostController);




//-----2
// const express = require("express");
// const multer = require("multer");
// const router = express.Router();
// const { createPostController } = require("../controller/post.controller.js");

// // simple multer config
// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/", upload.single("image"), createPostController);

// module.exports = router;




const express = require("express");
const authMiddleware = require("../middleware/middleware.js");
const multer = require("multer");
const { createPostController } = require("../controller/post.controller.js");

const router = express.Router();

// Multer memory storage (no filter, no limit)
const upload = multer({ storage: multer.memoryStorage() });

// POST route with auth + simple multer
router.post(
  "/",
  authMiddleware, // first, check authentication
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        // Any Multer error is caught
        return res.status(400).json({ success: false, error: err.message });
      }
      next();
    });
  },
  createPostController // then your controller handles req.file
);

module.exports = router;
