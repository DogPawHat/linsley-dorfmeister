import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_category-sidebar/$collectionId/")({
  component: () => <div>Hello /_category-sidebar/$collection/!</div>,
});
