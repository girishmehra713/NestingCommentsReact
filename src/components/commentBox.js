import React, { useState } from "react";
/* eslint-disable react/prop-types */
export default function CommentBox(props) {
  const {
    createHeader = "",
    id = "",
    handleAddComment,
    handleEditComment,
    handleReplyClick,
    handleEditClick,
  } = props;
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);

  const validateComment = () => {
    return createHeader !== "Edit"
      ? name !== "" && comment !== ""
      : comment !== "";
  };

  const handlePostComment = () => {
    if (!validateComment()) {
      setIsError(true);
      return;
    }
    setIsError(false);
    if (createHeader === "Edit") {
      handleEditComment(id, comment);
      handleEditClick();
      setComment("");
    } else {
      handleAddComment(id, name, comment);
      if (createHeader === "Reply") {
        handleReplyClick();
      }
      setName("");
      setComment("");
    }
  };
  return (
    <div
      className={`create-cmnt ${
        createHeader !== "Comment" ? "create-rep-w" : "create-cmt-w "
      }`}
    >
      {createHeader !== "Edit" && <h2 className="header">{createHeader}</h2>}

      {createHeader !== "Edit" && (
        <input
          className="person-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      {createHeader !== "Edit" && isError && name === "" ? (
        <p className="error-msg">*Please Enter Name</p>
      ) : null}

      <textarea
        className="comment-reply"
        rows="5"
        cols="60"
        value={comment}
        placeholder={createHeader}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      {isError && comment === "" ? (
        <p className="error-msg">*Please Enter Comment</p>
      ) : null}

      <button className="post-btn" onClick={handlePostComment}>
        {createHeader !== "Edit" ? "POST" : "SAVE"}
      </button>
    </div>
  );
}
