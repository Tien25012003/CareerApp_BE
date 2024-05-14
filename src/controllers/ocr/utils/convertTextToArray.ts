const SUBJECTS = ["Toán", "Vật lí", "Hóa học", "Sinh học", "Tin học", "Địa lí"];
export const convertTextToArray = (text: string) => {
  const lines = text.split("\n");
  const subjects: string[] = [];
  for (const line of lines) {
    subjects.push(line?.trim());
  }
  return subjects;
};
