import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_category-sidebar/products/$categoryId/$subCategoryId/$productId/"
)({
  component: () => (
    <div>
      Hello /_category-sidebar/products/$category/$subcategory/$product/!
    </div>
  ),
});
