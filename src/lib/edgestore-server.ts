import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

// Initialize EdgeStore
const es = initEdgeStore.create();

// Create your router
export const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});

// Create the API handler for Next.js
export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

// Initialize the backend client for server-side uploads
import { initEdgeStoreClient } from "@edgestore/server/core";
export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

// Optional: Type-safe router type
export type EdgeStoreRouter = typeof edgeStoreRouter;
