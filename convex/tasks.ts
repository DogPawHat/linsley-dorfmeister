import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const subCollectionsCategoriesFix = mutation({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const subcategoriesPaginate = await ctx.db
      .query("subcategories")
      .order("desc")
      .paginate(args.paginationOpts);

    await Promise.all(
      subcategoriesPaginate.page.map(async (subcategory) => {
        const oldCollectionId = subcategory.subcollection_id;

        const subCollection = await ctx.db
          .query("subcollections")
          .filter((q) => q.eq(q.field("id"), `${oldCollectionId}`))
          .first();

        await ctx.db.patch(subcategory._id, {
          subCollectionId: subCollection._id,
        });
      })
    );

    return subcategoriesPaginate;
  },
});

// export const subCollectionsCasingFix = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const categories = await ctx.db.query("categories").collect();

//     for (const category of categories) {
//       const imageUrl = category.image_url;

//       await ctx.db.patch(category._id, {
//         collection_id: undefined,
//         image_url: undefined,
//         imageUrl,
//       });
//     }
//   },
// });
