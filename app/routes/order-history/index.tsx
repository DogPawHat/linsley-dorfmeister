import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/order-history/")({
  meta: () => [
    {
      title: "Order History",
    },
  ],
  component: OrderHistory,
});

function OrderHistory() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="w-full border-b-2 border-green-800 text-left font-futura text-2xl text-green-800">
        Order History
      </h1>
      <div className="mx-auto flex max-w-md flex-col gap-4 text-black">
        {/* <Suspense>
          <OrderHistoryDynamic />
        </Suspense> */}
      </div>
    </main>
  );
}
