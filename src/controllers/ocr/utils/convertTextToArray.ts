const SUBJECTS = ["Toán", "Vật lí", "Hóa học", "Sinh học", "Tin học", "Địa lí"];
export const convertTextToArray = (text: string) => {
  // Split the text by line breaks
  const lines = text.split("\n");
  const subjects: Array<{ [key in any]: string }> = [];
  for (const line of lines) {
    const [subject, score] = line.split(":").map((item) => item.trim());
    subjects.push({ [subject.toString()]: score.toString() } as never);
  }
  return subjects;
};
