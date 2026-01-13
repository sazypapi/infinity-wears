import { handler } from "@/lib/edgestore-server";

// Use the same handler for GET and POST requests
export { handler as GET, handler as POST };
