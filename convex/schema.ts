import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  collections: defineTable({
    name: v.string(),
    slug: v.string(),
  }),
  categories: defineTable({
    collectionId: v.id("collections"),
    name: v.string(),
    slug: v.string(),
  }),
  subcollections: defineTable({
    categoryId: v.id("categories"),
    name: v.string(),
  }),
  subcategories: defineTable({
    imageUrl: v.string(),
    name: v.string(),
    slug: v.string(),
    subCollectionId: v.id("subcollections"),
  }),
  products: defineTable({
    description: v.string(),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    price: v.union(v.null(), v.float64()),
    slug: v.string(),
    subCategoryId: v.id("subcategories"),
  }),
});
