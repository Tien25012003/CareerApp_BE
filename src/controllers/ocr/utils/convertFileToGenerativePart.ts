import fs from "fs-extra";
export const convertFileToGenerativePart = async (file: any) => {
  try {
    // Read the file using fs-extra
    const fileData = await fs.readFile(file.path);

    // Convert file data to base64
    const base64EncodedData = fileData.toString("base64");

    return {
      inlineData: { data: base64EncodedData, mimeType: file.mimetype },
    };
  } catch (error) {
    console.error("Error converting file to GenerativeAI.Part:", error);
  }
};
