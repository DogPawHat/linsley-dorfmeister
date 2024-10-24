import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_category-sidebar/products/$categoryId/',
)({
  component: () => <div>Hello /_category-sidebar/products/$category/!</div>,
})
