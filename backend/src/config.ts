import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET: string|undefined = process.env.JWTSECRET;
const MONGODB_URI : string|undefined = process.env.MONGODB_URI;

export { JWT_SECRET, MONGODB_URI };
