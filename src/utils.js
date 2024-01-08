function addComment(commentData, commentId, name, comment) {
  if (commentData.id === commentId) {
    commentData.replies.push({
      id: new Date().getTime(),
      date: getFormattedDate(new Date()),
      name: name,
      comment: comment,
      replies: [],
    });

    return commentData;
  }

  let latestNode = [];
  latestNode = commentData.replies.map((ob) => {
    return addComment(ob, commentId, name, comment);
  });

  return { ...commentData, replies: latestNode };
}

function deleteComment(commentData, id) {
  for (let i = 0; i < commentData?.replies.length; i++) {
    const currentItem = commentData.replies[i];
    if (currentItem.id === id) {
      commentData.replies.splice(i, 1);
      return commentData;
    } else {
      deleteComment(currentItem, id);
    }
  }
  return commentData;
}

function editComment(commentData, commentId, commentText) {
  if (commentData.id === commentId) {
    commentData.comment = commentText;
    return commentData;
  }

  commentData.replies.map((ob) => {
    return editComment(ob, commentId, commentText);
  });

  return { ...commentData };
}

function sortComments(commentData, desc) {
  commentData?.replies.sort((cmt1, cmt2) =>
    desc ? cmt2.id - cmt1.id : cmt1.id - cmt2.id
  );
  return commentData;
}

function getFormattedDate(currentDate) {
  const mapMonthName = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  let date = currentDate.getDate();
  if (date < 10) date = "0" + date;
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  return date + "-" + mapMonthName[month] + "-" + year;
}

export {
  addComment,
  deleteComment,
  editComment,
  getFormattedDate,
  sortComments,
};
