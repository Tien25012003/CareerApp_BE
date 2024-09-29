import JWT from "jsonwebtoken";
export const generateToken = (userId: string) => {
  const jwtSecretKey = "25012003";
  const data = {
    time: Date(),
    userId,
  };
  if (jwtSecretKey) {
    const token = JWT.sign(data, jwtSecretKey, { expiresIn: "6h" });
    return token;
  }
};
