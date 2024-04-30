import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  }
}
