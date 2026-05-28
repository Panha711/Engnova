import { Prisma } from "@prisma/client";
import { cache } from "react";
import { auth, signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DEMO_EMAIL = "demo@engnova.dev";
const DEMO_PASSWORD = "password123";

export type AppUser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
};

async function loadDemoUser(): Promise<AppUser> {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: DEMO_EMAIL },
      include: { profile: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new Error(
        "Cannot connect to the database. Check DATABASE_URL in .env, then run pnpm db:push && pnpm db:seed.",
        { cause: error },
      );
    }
    throw error;
  }
  if (!user) {
    throw new Error("Demo user missing. Run: pnpm db:push && pnpm db:seed");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    level: user.profile?.level ?? "BEGINNER",
  };
}

/** Returns the current user, signing in as the demo account when needed. */
export const getSessionUser = cache(async (): Promise<AppUser> => {
  const session = await auth();
  if (session?.user?.id) {
    return {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email ?? null,
      image: session.user.image ?? null,
      level: session.user.level ?? "BEGINNER",
    };
  }

  const demo = await loadDemoUser();

  try {
    await signIn("credentials", {
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      redirect: false,
    });
  } catch {
    // Session cookie is set on the response; prisma fallback covers this request.
  }

  return demo;
});
