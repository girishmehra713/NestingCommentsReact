import React from "react";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

export default function SortComments({ handleSortClick, ascendingSort }) {
  return (
    <div className="sort-date">
      <span className="sort-text">Sort By Date and Time</span>
      {ascendingSort ? (
        <FaSortAmountDownAlt className="sort-icon" onClick={handleSortClick} />
      ) : (
        <FaSortAmountUp className="sort-icon" onClick={handleSortClick} />
      )}
    </div>
  );
}
