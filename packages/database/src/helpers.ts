import { prisma } from './index';
import type { Prisma } from '@prisma/client';

// Posts helpers
export async function getPosts(options?: {
  take?: number;
  skip?: number;
  where?: Prisma.PostWhereInput;
  orderBy?: Prisma.PostOrderByWithRelationInput;
  includeTags?: boolean;
  includeCategories?: boolean;
  includeAuthor?: boolean;
}) {
  const { take, skip, where, orderBy, includeTags = false, includeCategories = false, includeAuthor = false } = options || {};
  
  return prisma.post.findMany({
    take,
    skip,
    where,
    orderBy,
    include: {
      tags: includeTags,
      categories: includeCategories,
      author: includeAuthor,
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      tags: true,
      categories: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

// Categories helpers
export async function getCategories(options?: {
  take?: number;
  skip?: number;
  where?: Prisma.CategoryWhereInput;
}) {
  const { take, skip, where } = options || {};
  
  return prisma.category.findMany({
    take,
    skip,
    where,
  });
}

// Tags helpers
export async function getTags(options?: {
  take?: number;
  skip?: number;
  where?: Prisma.TagWhereInput;
}) {
  const { take, skip, where } = options || {};
  
  return prisma.tag.findMany({
    take,
    skip,
    where,
  });
}

// Products helpers
export async function getProducts(options?: {
  take?: number;
  skip?: number;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  includeCategories?: boolean;
}) {
  const { take, skip, where, orderBy, includeCategories = false } = options || {};
  
  return prisma.product.findMany({
    take,
    skip,
    where,
    orderBy,
    include: {
      categories: includeCategories,
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      categories: true,
    },
  });
}

// Orders helpers
export async function getOrders(options?: {
  take?: number;
  skip?: number;
  where?: Prisma.OrderWhereInput;
  orderBy?: Prisma.OrderOrderByWithRelationInput;
  includeItems?: boolean;
  includeUser?: boolean;
}) {
  const { take, skip, where, orderBy, includeItems = false, includeUser = false } = options || {};
  
  return prisma.order.findMany({
    take,
    skip,
    where,
    orderBy,
    include: {
      items: includeItems ? {
        include: {
          product: true,
        },
      } : false,
      user: includeUser ? {
        select: {
          id: true,
          name: true,
          email: true,
        },
      } : false,
    },
  });
}

// Testimonies helpers
export async function getTestimonies(options?: {
  take?: number;
  skip?: number;
  where?: Prisma.TestimonyWhereInput;
  orderBy?: Prisma.TestimonyOrderByWithRelationInput;
  includeUser?: boolean;
}) {
  const { take, skip, where, orderBy, includeUser = false } = options || {};
  
  return prisma.testimony.findMany({
    take,
    skip,
    where,
    orderBy,
    include: {
      user: includeUser ? {
        select: {
          id: true,
          name: true,
          image: true,
        },
      } : false,
    },
  });
}
