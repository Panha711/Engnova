import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    };
  }

  interface User {
    id: string;
    level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  }
}
