import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_category-sidebar/$collection/")({
  component: () => <div>Hello /_category-sidebar/$collection/!</div>,
});
