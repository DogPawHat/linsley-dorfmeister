import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { seo } from "~/lib/seo";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    ...seo({
      title: "Dorfmeister & Linsley",
      description: `A performant site built with Tanstack Start & Convex`,
    }),
  ],
  links: () => [{ rel: "stylesheet", href: appCss }],
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument(props: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <div>
          <header className="z-10 flex flex-grow items-center justify-between gap-4 border-b-2 border-yellow-300 bg-background p-2 pb-[4px] pt-2 font-futura sm:flex-row sm:p-4 sm:pb-[4px] sm:pt-0">
            <div className="flex flex-grow flex-col">
              <div className="absolute right-2 top-2 flex justify-end pt-2 font-sans text-sm hover:underline sm:relative sm:right-0 sm:top-0">
                {/* <Suspense
                  fallback={
                    <button className="flex flex-row items-center gap-1">
                      <div className="h-[20px]" />
                      <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]">
                        <polygon points="0,0 5,6 10,0"></polygon>
                      </svg>
                    </button>
                  }
                >
                  <AuthServer />
                </Suspense> */}
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-2 sm:w-auto sm:flex-row sm:items-center">
                <Link to="/" className="text-4xl font-bold text-green-800">
                  DorfMEISTER-LINSEY
                </Link>
                <div className="items flex w-full flex-row items-center justify-between gap-4">
                  {/* <div className="mx-0 flex-grow sm:mx-auto sm:flex-grow-0">
                    <SearchDropdownComponent />
                  </div> */}
                  <div className="flex flex-row justify-between space-x-4">
                    <div className="relative">
                      {/* <Link
                        to="/order"
                        className="text-lg text-green-800 hover:underline"
                      >
                        ORDER
                      </Link> */}
                      {/* <Suspense>
                        <Cart />
                      </Suspense> */}
                    </div>
                    {/* <Link
                      prefetch={true}
                      href="/order-history"
                      className="hidden text-lg text-green-800 hover:underline md:block"
                    >
                      ORDER HISTORY
                    </Link> */}
                    {/* <Link
                      prefetch={true}
                      href="/order-history"
                      aria-label="Order History"
                      className="block text-lg text-green-800 hover:underline md:hidden"
                    >
                      <MenuIcon />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {props.children}
        </div>
        <footer className="flex h-[8px] flex-col items-center justify-between space-y-2 border-t border-gray-400 bg-background px-4 font-helvetica text-[11px] sm:h-6 sm:flex-row sm:space-y-0">
          <div className="flex flex-wrap justify-center space-x-2 pt-2 sm:justify-start">
            <span className="hover:bg-yellow-100 hover:underline">Home</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Location
            </span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">Returns</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">Careers</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Mobile App
            </span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Solidworks Add-In
            </span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">Help</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Settings
            </span>
          </div>
          <div className="text-center sm:text-right">
            By using this website, you agree to check out the{" "}
            <a
              href="https://github.com/dogpawhat/linsey-dorfmeister"
              className="font-bold hover:underline"
              target="_blank"
            >
              Source Code
            </a>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
