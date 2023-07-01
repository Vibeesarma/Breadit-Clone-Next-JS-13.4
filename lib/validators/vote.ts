import { z } from "zod";

export const postVoteValidator = z.object({
  postId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type PostVoteRequest = z.infer<typeof postVoteValidator>;

export const commentPostVoteValidator = z.object({
  commmentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type CommentPostVoteRequest = z.infer<typeof postVoteValidator>;
