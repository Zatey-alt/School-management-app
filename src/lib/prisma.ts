import { PrismaClient } from '@prisma/client';

// Extend globalThis to allow for prismaGlobal
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Define a type for valid NODE_ENV values
type NodeEnv = 'production' | 'development' | 'test';

// Narrow the type of NODE_ENV using a runtime check
const getNodeEnv = (): NodeEnv => {
  const env = process.env.NODE_ENV;
  if (env === 'production' || env === 'development' || env === 'test') {
    return env;
  }
  console.warn(`NODE_ENV is not set or invalid. Defaulting to 'development'.`);
  return 'development';
};

const nodeEnv = getNodeEnv();

if (nodeEnv === 'production') {
  prisma = new PrismaClient();
} else {
  // In development or serverless environments, reuse Prisma client to avoid reinitialization
  if (globalThis.prismaGlobal) {
    prisma = globalThis.prismaGlobal;
  } else {
    prisma = new PrismaClient();
    globalThis.prismaGlobal = prisma;
  }
}

export default prisma;
