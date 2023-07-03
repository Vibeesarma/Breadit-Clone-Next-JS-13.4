import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { usernameValidatar } from "@/lib/validators/username";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name } = usernameValidatar.parse(body);

    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    });

    if (username) {
      return new Response("Username is taken", { status: 409 });
    }

    // update user

    await db.user.update({
      where: { id: session.user.id },
      data: { username: name },
    });

    return new Response("OK");
  } catch (error) {
    console.log("🚀 ~ file: route.ts:37 ~ PATCH ~ error:", error);

    if (error instanceof z.ZodError) {
      // this error code not a valid entity
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update username, please try again later", {
      status: 500,
    });
  }
}
