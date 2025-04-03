import { PrismaClient } from '@prisma/client';

// Add Prisma Client extensions here if needed

// Prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export * from '@prisma/client';

// Export types and utilities
export type { User, Post, Category, Tag, Product, Order, OrderItem, Promotion, Testimony } from '@prisma/client';
export type { Role, OrderStatus, PaymentStatus } from '@prisma/client';

// Export helper functions for common database operations
export * from './helpers';
