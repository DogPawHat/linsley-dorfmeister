import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/_category-sidebar")({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(
      convexQuery(api.collections.getCollections, {})
    );
  },
  component: Sidebar,
});

export default function Sidebar() {
  const { data: allCollections } = useSuspenseQuery(
    convexQuery(api.collections.getCollections, {})
  );

  return (
    <div className="flex flex-grow font-helvetica-roman">
      <aside className="hidden w-64 min-w-64 max-w-64 border-r p-4 md:block">
        <h2 className="border-b border-green-800 text-sm font-semibold text-green-900">
          Choose a Category
        </h2>
        <ul className="flex flex-col items-start justify-center">
          {allCollections.map((collection) => (
            <li key={collection.slug} className="w-full">
              <Link
                to={`/`}
                className="block w-full py-1 text-xs text-gray-800 hover:bg-yellow-100 hover:underline"
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main
        className="h-[calc(100vh-113px)] overflow-y-auto p-4 pt-0"
        id="main-content"
      >
        <Outlet />
      </main>
    </div>
  );
}
