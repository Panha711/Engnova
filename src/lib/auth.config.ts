import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no Prisma / no bcrypt imports here).
// Used by proxy.ts for route protection and shared with the full auth setup.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request }) {
      if (request.nextUrl.pathname === "/") {
        return Response.redirect(new URL("/vocabulary", request.nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.level =
          ((user as { level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" }).level) ??
          "BEGINNER";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.level = token.level ?? "BEGINNER";
      }
      return session;
    },
  },
  providers: [], // real providers live in auth.ts
};
