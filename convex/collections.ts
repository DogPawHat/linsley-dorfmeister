import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { query, type QueryCtx } from "./_generated/server";
import { components } from "./_generated/api";
import { asyncMap } from "convex-helpers";
import {
  getOneFromOrThrow,
  getManyFrom,
} from "convex-helpers/server/relationships";

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

// export const getCategoryProductCountBySlug = query({
//   args: {
//     slug: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const category = await getCategoryBySlugHelper(ctx, args.slug);

//     const complexProducts = await asyncMap(
//       getSubcollectionsByCategoryIdHelper(ctx, category._id),
//       async (subcollection) =>
//         asyncMap(
//           getSubcategoryBySubcollectionIdHelper(ctx, subcollection._id),
//           async (subcategory) =>
//             await getProductsBySubcategoryIdHelper(ctx, subcategory._id)
//         )
//     );

//     const products = complexProducts.flat().flat();

//     return products.length;
//   },
// });

// export const getSubcategoryProductCountBySlug = query({
//   args: {
//     slug: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const subcategory = await getSubcategoryBySlugHelper(ctx, args.slug);

//     const products = await getProductsBySubcategoryIdHelper(
//       ctx,
//       subcategory._id
//     );

//     return products.length;
//   },
// });

// export const getSearchResults = query({
//   handler: async (ctx, searchTerm: string) => {
//     let results;
//     if (searchTerm.length <= 2) {
//       results = await ctx.db
//         .query("products")
//         .filter((q) => q.ilike(q.field("name"), `${searchTerm}%`))
//         .take(5);
//     } else {
//       const formattedSearchTerm = searchTerm
//         .split(" ")
//         .filter((term) => term.trim() !== "")
//         .map((term) => `${term}:*`)
//         .join(" & ");

//       results = await ctx.db
//         .query("products")
//         .filter((q) => q.textSearch(q.field("name"), formattedSearchTerm))
//         .take(5);
//     }
//     return results;
//   },
// });
