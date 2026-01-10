// const express = require("express");
// const cookieParser = require("cookie-parser");
// const connectDB = require("./src/db/db.js");
// const router = require("./src/routes/routes.js");

// const app = express();
// const port = 3000;
// require("dotenv").config();
// app.use(express.json());
// app.use(cookieParser());

// connectDB();
// app.use("/api", router);

// // example
// app.post("/test", (req, res) => {
//   console.log("req rcvd");
//   console.log(req.body);
//   res.send("tested success");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
require("dotenv").config(); // ✅ FIRST LINE — NO EXCEPTIONS

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/db/db.js");
const router = require("./src/routes/routes.js");
const postRoutes = require("./src/routes/post.route");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

connectDB();

// ROUTES
app.use("/api", router);
app.use("/api/posts", postRoutes);

app.post("/test", (req, res) => {
  res.send("tested success");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
