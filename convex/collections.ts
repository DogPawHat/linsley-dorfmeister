import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { query, type QueryCtx } from "./_generated/server";
import { components } from "./_generated/api";
import { asyncMap } from "convex-helpers";
import {
  getOneFromOrThrow,
  getManyFrom,
} from "convex-helpers/server/relationships";
import { paginationOptsValidator } from "convex/server";

import { ShardedCounter } from "@convex-dev/sharded-counter";

const counter = new ShardedCounter(components.shardedCounter);
const numProducts = counter.for("products");

async function getCollectionBySlugHelper(ctx: QueryCtx, slug: string) {
  return await getOneFromOrThrow(ctx.db, "collections", "slug", slug);
}

async function getCategoryBySlugHelper(ctx: QueryCtx, slug: string) {
  return await getOneFromOrThrow(ctx.db, "categories", "slug", slug);
}

async function getSubcategoryBySlugHelper(ctx: QueryCtx, slug: string) {
  return await getOneFromOrThrow(ctx.db, "subcategories", "slug", slug);
}

async function getProductBySlugHelper(ctx: QueryCtx, slug: string) {
  return await getOneFromOrThrow(ctx.db, "products", "slug", slug);
}

async function getCategorysByCollectionIdHelper(
  ctx: QueryCtx,
  collectionId: Id<"collections">
) {
  return await getManyFrom(ctx.db, "categories", "collectionId", collectionId);
}

async function getSubcollectionsByCategoryIdHelper(
  ctx: QueryCtx,
  categoryId: Id<"categories">
) {
  return await getManyFrom(ctx.db, "subcollections", "categoryId", categoryId);
}

async function getSubcategoryBySubcollectionIdHelper(
  ctx: QueryCtx,
  subcollectionId: Id<"subcollections">
) {
  return await getManyFrom(
    ctx.db,
    "subcategories",
    "subCollectionId",
    subcollectionId
  );
}

async function getProductsBySubcategoryIdHelper(
  ctx: QueryCtx,
  subCategoryId: Id<"subcategories">
) {
  return await getManyFrom(ctx.db, "products", "subCategoryId", subCategoryId);
}

export const getProductsForSubcategory = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const subcategory = await getSubcategoryBySlugHelper(ctx, args.slug);
    return await getProductsBySubcategoryIdHelper(ctx, subcategory._id);
  },
});

export const getCollections = query({
  handler: async (ctx) => {
    return await ctx.db.query("collections").order("asc").collect();
  },
});

export const getCollectionWithCategories = query({
  handler: async (ctx) => {
    const collections = ctx.db.query("collections").order("asc").collect();
    return await asyncMap(collections, async (collection) => {
      return {
        ...collection,
        categories: await getCategorysByCollectionIdHelper(ctx, collection._id),
      };
    });
  },
});

export const getProductDetailsBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await getProductBySlugHelper(ctx, args.slug);
  },
});

export const getSubcategoryBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await getSubcategoryBySlugHelper(ctx, args.slug);
  },
});

export const getCategoryBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await getCategoryBySlugHelper(ctx, args.slug);
  },
});

export const getCollectionDetailsBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const collection = await getCollectionBySlugHelper(ctx, args.slug);
    return {
      ...collection,
      categories: await getCategorysByCollectionIdHelper(ctx, collection._id),
    };
  },
});

export const getProductCount = query({
  handler: async (ctx) => {
    return await numProducts.count(ctx);
  },
});

export const getSubcategoriesPaginatedImages = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("subcategories")
      .withIndex("imageUrl")
      .paginate(args.paginationOpts);

    const imageUrlSet = new Set(
      result.page.map((subcategory) => subcategory.imageUrl)
    );

    return {
      ...result,
      page: Array.from(imageUrlSet),
    };
  },
});

export const getCategoriesPaginatedImages = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("categories")
      .withIndex("imageUrl")
      .paginate(args.paginationOpts);

    const imageUrlSet = new Set(
      result.page.map((category) => category.imageUrl)
    );

    return {
      ...result,
      page: Array.from(imageUrlSet),
    };
  },
});

export const getProductsPaginatedImages = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("products")
      .withIndex("imageUrl")
      .paginate(args.paginationOpts);

    const imageUrlSet = new Set(result.page.map((product) => product.imageUrl));

    return {
      ...result,
      page: Array.from(imageUrlSet),
    };
  },
});
