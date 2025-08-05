import { useState } from "react";
import "./styles.css";
const Pagination = () => {
  const totalPages = [1, 2, 3, 4, 5];
  const [currPage, setCurrPage] = useState(1);

  const selectPage = (page) => {
    setCurrPage(page);
  };

  const prev = () => {
    currPage > 1 ? selectPage(currPage - 1) : console.log("no prev");
  };
  const next = () => {
    currPage < totalPages.length
      ? selectPage(currPage + 1)
      : console.log("no next");
  };
  return (
    <div className="pagination">
      <button className="pg-btn" disabled={currPage === 1} onClick={prev}>
        prev
      </button>
      {totalPages.map((index) => {
        return (
          <button
            className={`pg-nb ${currPage === index ? "active" : ""}`}
            key={index}
            onClick={() => selectPage(index)}
          >
            {index}
          </button>
        );
      })}
      <button
        className="pg-btn"
        disabled={currPage === totalPages.length}
        onClick={() => next()}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
