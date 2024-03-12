import api from "@/api/index.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateReactionDto {
  reviewId: number;
  reactionValue: number;
}

export default function useMutationCreateReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reactionValue }: CreateReactionDto) =>
      api.reviews.createReactionInReview(reviewId, reactionValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: true, queryKey: ["reviews"] });
    },
  });
}

// import api from "@/api/index.api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export default function useMutationCreateReaction() {
//   const queryClient = useQueryClient();
//   const mutationFn = api.reviews.createReactionInReview;

//   return useMutation<unknown, unknown, CreateReactionDto>({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ exact: true, queryKey: ["reviews"] });
//     },
//   });
// }