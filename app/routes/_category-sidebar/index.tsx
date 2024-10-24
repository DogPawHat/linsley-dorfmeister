import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_category-sidebar/")({
  component: () => <div>Hello /_category-sidebar/!</div>,
});
