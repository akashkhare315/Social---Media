require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Utility: get a valid model
 */
async function getValidModel() {
  try {
    const models = await genAI.listModels(); // list all available models
    // Try to find gemini-2.5-flash
    const model = models.find((m) => m.name === "gemini-2.5-flash");
    if (!model) {
      throw new Error("No valid Gemini model found in your API key");
    }
    return model.name;
  } catch (err) {
    console.error("Error listing models:", err.message);
    // fallback hard-coded
    return "gemini-2.5-flash";
  }
}

/**
 * Generate image caption from base64
 */
async function generateCaption(base64Image, mimeType) {
  try {
    const modelName = await getValidModel();

    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      {
        text: `Caption this image.
Generate only one caption.
Make it meaningful and sometimes funny.`,
      },
    ]);

    return result.response.text();
  } catch (err) {
    console.error("[GoogleGenerativeAI Error]:", err.message);
    throw new Error(`[GoogleGenerativeAI Error]: ${err.message}`);
  }
}

module.exports = { generateCaption };
