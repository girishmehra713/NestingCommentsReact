import React, { useEffect, useState } from "react";
import Comment from "./comment";
import CommentBox from "./commentBox";
import { addComment, deleteComment, editComment, sortComments } from "../utils";
import SortComments from "./sortComments";
export default function CommentWrapper() {
  const comments = {
    id: 1,
    replies: [],
  };
  const [commentData, setCommentData] = useState(
    JSON.parse(localStorage.getItem("comments")) || comments
  );
  const [ascendingSort, setAscendingSort] = useState(true);
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentData));
  }, [commentData]);

  const handleAddComment = (parentId, name, comment) => {
    const newCommentData = addComment(commentData, parentId, name, comment);
    console.log(newCommentData);
    setCommentData({ ...newCommentData });
  };

  const handleDelComment = (id) => {
    const newCommentData = deleteComment(commentData, id);
    setCommentData({ ...newCommentData });
  };

  const handleEditComment = (parentId, comment) => {
    const newCommentData = editComment(commentData, parentId, comment);
    setCommentData(newCommentData);
  };

  const handleSortClick = () => {
    setAscendingSort(!ascendingSort);
    setCommentData({ ...sortComments(commentData, ascendingSort) });
  };
  return (
    <>
      <CommentBox
        id={1}
        createHeader={"Comment"}
        handleAddComment={handleAddComment}
      />
      {commentData?.replies.length > 1 ? (
        <SortComments
          handleSortClick={handleSortClick}
          ascendingSort={ascendingSort}
        />
      ) : null}
      <div className="comment-list">
        {commentData?.replies.length > 0
          ? commentData?.replies.map((commentItem) => {
              return (
                <Comment
                  key={commentItem?.id}
                  {...commentItem}
                  handleAddComment={handleAddComment}
                  handleEditComment={handleEditComment}
                  handleDelComment={handleDelComment}
                  handleSortClick={handleSortClick}
                  ascendingSort={ascendingSort}
                />
              );
            })
          : null}
      </div>
    </>
  );
}
