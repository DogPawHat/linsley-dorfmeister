/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CategorySidebarImport } from './routes/_category-sidebar'
import { Route as CategorySidebarIndexImport } from './routes/_category-sidebar/index'

// Create/Update Routes

const CategorySidebarRoute = CategorySidebarImport.update({
  id: '/_category-sidebar',
  getParentRoute: () => rootRoute,
} as any)

const CategorySidebarIndexRoute = CategorySidebarIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => CategorySidebarRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_category-sidebar': {
      id: '/_category-sidebar'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof CategorySidebarImport
      parentRoute: typeof rootRoute
    }
    '/_category-sidebar/': {
      id: '/_category-sidebar/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof CategorySidebarIndexImport
      parentRoute: typeof CategorySidebarImport
    }
  }
}

// Create and export the route tree

interface CategorySidebarRouteChildren {
  CategorySidebarIndexRoute: typeof CategorySidebarIndexRoute
}

const CategorySidebarRouteChildren: CategorySidebarRouteChildren = {
  CategorySidebarIndexRoute: CategorySidebarIndexRoute,
}

const CategorySidebarRouteWithChildren = CategorySidebarRoute._addFileChildren(
  CategorySidebarRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof CategorySidebarRouteWithChildren
  '/': typeof CategorySidebarIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof CategorySidebarIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_category-sidebar': typeof CategorySidebarRouteWithChildren
  '/_category-sidebar/': typeof CategorySidebarIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/'
  id: '__root__' | '/_category-sidebar' | '/_category-sidebar/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  CategorySidebarRoute: typeof CategorySidebarRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  CategorySidebarRoute: CategorySidebarRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_category-sidebar"
      ]
    },
    "/_category-sidebar": {
      "filePath": "_category-sidebar.tsx",
      "children": [
        "/_category-sidebar/"
      ]
    },
    "/_category-sidebar/": {
      "filePath": "_category-sidebar/index.tsx",
      "parent": "/_category-sidebar"
    }
  }
}
ROUTE_MANIFEST_END */
