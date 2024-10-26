import { createFileRoute, Link } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@unpic/react";

import { api } from "convex/_generated/api";

export const Route = createFileRoute("/_category-sidebar/")({
  loader: async ({ context }) => {
    Promise.all([
      context.queryClient.ensureQueryData(
        convexQuery(api.collections.getCollectionWithCategories, {})
      ),
      context.queryClient.ensureQueryData(
        convexQuery(api.collections.getProductCount, {})
      ),
    ]);
  },
  component: Home,
});

export default function Home() {
  const { data: collections } = useSuspenseQuery(
    convexQuery(api.collections.getCollectionWithCategories, {})
  );
  const { data: productCount } = useSuspenseQuery(
    convexQuery(api.collections.getProductCount, {})
  );
  let imageCount = 0;

  return (
    <div className="w-full p-4">
      <div className="mb-2 w-full flex-grow border-b-[1px] border-green-800 text-sm font-semibold text-black">
        Explore {productCount.toLocaleString()} products
      </div>
      {collections.map((collection) => (
        <div key={collection.name}>
          <h2 className="text-xl font-semibold">{collection.name}</h2>
          <div className="flex flex-row flex-wrap justify-center gap-2 border-b-2 py-4 sm:justify-start">
            {collection.categories.map((category) => (
              <Link
                key={category.name}
                className="flex w-[125px] flex-col items-center text-center"
                href={`/products/${category.slug}`}
              >
                {/* <Image
                  loading={imageCount++ < 15 ? "eager" : "lazy"}
                  decoding="sync"
                  src={category.imageUrl ?? "/placeholder.svg"}
                  alt={`A small picture of ${category.name}`}
                  className="mb-2 h-14 w-14 border hover:bg-yellow-200"
                  width={48}
                  height={48}
                /> */}
                <span className="text-xs">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
