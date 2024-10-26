import { createFileRoute, Link } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_category-sidebar/$collectionSlug/")({
  loader: async ({ context, params }) => {
    Promise.all([
      context.queryClient.ensureQueryData(
        convexQuery(api.collections.getCollectionDetailsBySlug, {
          slug: params.collectionSlug,
        })
      ),
      context.queryClient.ensureQueryData(
        convexQuery(api.collections.getProductCount, {})
      ),
    ]);
  },
  component: Home,
});

function Home() {
  let imageCount = 0;
  const { collectionSlug } = Route.useParams();
  const { data: collections } = useSuspenseQuery(
    convexQuery(api.collections.getCollectionDetailsBySlug, {
      slug: collectionSlug,
    })
  );
  const { data: productCount } = useSuspenseQuery(
    convexQuery(api.collections.getProductCount, {})
  );


  
  return (
    <div className="w-full p-4">
      {collections.map((collection) => (
        <div key={collection.name}>
          <h2 className="text-xl font-semibold">{collection.name}</h2>
          <div className="flex flex-row flex-wrap justify-center gap-2 border-b-2 py-4 sm:justify-start">
            {collection.categories.map((category) => (
              <Link
                prefetch={true}
                key={category.name}
                className="flex w-[125px] flex-col items-center text-center"
                href={`/products/${category.slug}`}
              >
                <img
                  loading={imageCount++ < 15 ? "eager" : "lazy"}
                  decoding="sync"
                  src={category.image_url ?? "/placeholder.svg"}
                  alt={`A small picture of ${category.name}`}
                  className="mb-2 h-14 w-14 border hover:bg-yellow-200"
                  width={48}
                  height={48}
                />
                <span className="text-xs">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
  );
}
