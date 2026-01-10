// require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function generateCaption(base64Image, mimeType) {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-pro-vision",
//     });

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: base64Image,
//           mimeType,
//         },
//       },
//       "Generate one short, meaningful, slightly funny social media caption for this image.",
//     ]);

//     return result.response.text();
//   } catch (err) {
//     console.error("Gemini Error:", err.message);

//     // fallback so post creation never breaks
//     return "A moment worth sharing ✨";
//   }
// }

// module.exports = { generateCaption };


require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateCaption() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(
      "Generate one short, meaningful, slightly funny social media caption."
    );

    return result.response.text();
  } catch (err) {
    console.error("Gemini Error:", err.message);
    return "A moment worth sharing ✨";
  }
}

module.exports = { generateCaption };
