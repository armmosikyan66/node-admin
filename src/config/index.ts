import dotenv from "dotenv";
import * as path from "path";

export const rootPath: string = process.cwd();
export const nodeEnv = process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config({ path: path.join(rootPath, `.env.${nodeEnv}`) })

export const apiPort: number = Number(process.env.PORT);
export const corsOrigins: string[] | undefined = process.env.CORS_ORIGINS?.split(",");
export const apiUrl: string = String(process.env.API_URL);
export const appUrl: string = String(process.env.API_URL);
export const mongoUrl: string = String(process.env.MONGO_CONNECTION_STRING);
export const mailerHost: string = String(process.env.SMTP_HOST);
export const mailerPort: number = Number(process.env.SMTP_PORT);
export const mailerUser: string = String(process.env.SMTP_USER);
export const mailerPass: string = String(process.env.SMTP_PASSWORD);
export const jwtAccessToken: string = String(process.env.ACCESS_TOKEN);
export const jwtRefreshToken: string = String(process.env.REFRESH_TOKEN);