import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DATABASE: process.env.MONGODB_CNN || '',
  JWT_SECRET: process.env.JWT_SECRET || ''
};
