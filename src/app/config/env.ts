import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: 'development' | 'production',
    JWT_ACCESS_SECRET: string,
    BCRYPT_SALT_ROUND: number,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASS: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ['PORT', 'DB_URL', 'NODE_ENV', 'JWT_ACCESS_SECRET'];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        BCRYPT_SALT_ROUND: Number(process.env.SALT) as number,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string
    }
}

export const envVars: EnvConfig = loadEnvVariables();