import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import { commentVoteValidator, postVoteValidator } from "@/lib/validators/vote";

import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { commentId, voteType } = commentVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unautorized", { status: 401 });
    }

    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    if (existingVote) {
      // ex - press up first again press up button then you want remove
      if (existingVote.type === voteType) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
        });
        return new Response("OK");
      } else {
        await db.commentVote.update({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
          data: {
            type: voteType,
          },
        });
      }

      return new Response("OK");
    }

    await db.commentVote.create({
      data: { type: voteType, userId: session.user.id, commentId },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      // this error code not a valid entity
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not Register you vote, please try again.", {
      status: 500,
    });
  }
}
