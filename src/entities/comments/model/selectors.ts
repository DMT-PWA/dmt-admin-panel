import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentCommentGroup = createSelector(
  (state: RootState) => state.comments,
  (commentGroup) => ({
    groupId: commentGroup.selected_comment,
    commentsInGroup: commentGroup.comments_list,
  })
);
