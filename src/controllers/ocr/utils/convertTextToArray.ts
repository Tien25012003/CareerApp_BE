const SUBJECTS = ["Toán", "Vật lí", "Hóa học", "Sinh học", "Tin học", "Địa lí"];
export const convertTextToArray = (text: string) => {
  // Split the text by line breaks
  const lines = text.split("\n");
  const formatedLines = lines.filter((line) => line.trim().length > 0 && line);
};
