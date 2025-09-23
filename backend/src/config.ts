import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWTSECRET;

export { JWT_SECRET };
