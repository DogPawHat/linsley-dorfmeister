import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const client = new ConvexHttpClient("https://unique-pigeon-194.convex.cloud");

async function updateAllSubCategories() {
  let continueCursor = null;
  let isDone = false;
  let count = 1;
  let page;

  while (!isDone) {
    ({ continueCursor, isDone, page } = await client.query(
      api.tasks.listSubCategories,
      {
        paginationOpts: { numItems: 1000, cursor: continueCursor },
      }
    ));

    console.log(`In page ${count}: ${page.length}`);
    count++;

    await client.mutation(api.tasks.subCollectionsCategoriesFix, {
      subCategoryIds: page.map((subCategory) => subCategory._id),
    });
  }

  console.log("Done");
}

updateAllSubCategories();
