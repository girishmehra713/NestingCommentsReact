import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import CommentBox from "./commentBox";
export default function Comment(props) {
  const {
    id = "",
    name = "",
    date = "",
    comment = "",
    replies = [],
    handleAddComment,
    handleEditComment,
    handleDelComment,
  } = props;
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const handleReplyClick = () => {
    setIsReplyClicked(!isReplyClicked);
  };
  const handleEditClick = () => {
    setIsEditClicked(!isEditClicked);
  };
  const handleDeleteClick = () => {
    handleDelComment(id);
  };
  return (
    <>
      <div className="comment">
        <div className="cmt-name-date">
          <h3 className="cmt-name">{name}</h3>
          <h4 className="cmt-date">{date}</h4>
        </div>
        <div className="cmt-text-del">
          <p className="cmt-text">{comment}</p>
          <MdDelete className="cmt-del" onClick={handleDeleteClick} />
        </div>
        <div className="cmt-reply-edit">
          <h3 className="cmt-reply" onClick={handleReplyClick}>
            Reply
          </h3>
          <h3 className="cmt-edit" onClick={handleEditClick}>
            Edit
          </h3>
        </div>
      </div>

      {isReplyClicked ? (
        <div className="reply-box">
          <CommentBox
            id={id}
            createHeader={"Reply"}
            handleAddComment={handleAddComment}
            handleReplyClick={handleReplyClick}
          />
        </div>
      ) : null}
      {isEditClicked ? (
        <div className="reply-box">
          <CommentBox
            id={id}
            createHeader={"Edit"}
            handleEditComment={handleEditComment}
            handleEditClick={handleEditClick}
          />
        </div>
      ) : null}

      <div>
        {replies?.length > 0
          ? replies.map((commentItem) => {
              return (
                <div key={commentItem?.id} className="reply-box">
                  <Comment
                    key={commentItem?.id}
                    {...commentItem}
                    handleAddComment={handleAddComment}
                    handleEditComment={handleEditComment}
                    handleDelComment={handleDelComment}
                  />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
