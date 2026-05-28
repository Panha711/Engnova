// Next.js 16 renamed `middleware` → `proxy`. This file runs on the Node.js
// runtime (the only runtime supported by `proxy`). It uses the edge-safe slice
// of the NextAuth config (no Prisma/bcrypt imports) to gate routes.
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Match everything except Next.js internals and static assets.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|audio).*)"],
};
