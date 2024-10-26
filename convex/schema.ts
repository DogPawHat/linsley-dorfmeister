import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  collections: defineTable({
    name: v.string(),
    slug: v.string(),
  }).index("slug", ["slug"]),
  categories: defineTable({
    collectionId: v.id("collections"),
    imageUrl: v.string(),
    name: v.string(),
    slug: v.string(),
  })
    .index("collectionId", ["collectionId"])
    .index("slug", ["slug"]),
  subcollections: defineTable({
    categoryId: v.id("categories"),
    name: v.string(),
  }).index("categoryId", ["categoryId"]),
  subcategories: defineTable({
    imageUrl: v.string(),
    name: v.string(),
    slug: v.string(),
    subCollectionId: v.id("subcollections"),
  })
    .index("subCollectionId", ["subCollectionId"])
    .index("slug", ["slug"]),
  products: defineTable({
    description: v.string(),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    price: v.union(v.null(), v.float64()),
    slug: v.string(),
    subCategoryId: v.id("subcategories"),
  })
    .index("subCategoryId", ["subCategoryId"])
    .index("slug", ["slug"])
    .searchIndex("search_name", {
      searchField: "name",
    }),
});
