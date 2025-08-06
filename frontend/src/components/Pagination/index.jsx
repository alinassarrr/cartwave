// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPagination, setCurrentPage } from "../../store/products/slice";
import "./styles.css";
const Pagination = () => {
  // const totalPages = [1, 2, 3, 4, 5];
  // const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);
  const { currentPage, totalPages } = pagination;

  const selectPage = (page) => {
    // setCurrPage(page);
    dispatch(setCurrentPage(page));
  };

  const prev = () => {
    // currPage > 1 ? selectPage(currPage - 1) : console.log("no prev");
    if (currentPage > 1) {
      selectPage(currentPage - 1);
    }
  };
  const next = () => {
    // currPage < totalPages.length
    //   ? selectPage(currPage + 1)
    //   : console.log("no next");
    if (currentPage < totalPages) {
      selectPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="pagination">
      <button className="pg-btn" disabled={currentPage === 1} onClick={prev}>
        prev
      </button>
      {pageNumbers.map((page) => {
        return (
          <button
            className={`pg-nb ${currentPage === page ? "active" : ""}`}
            key={page}
            onClick={() => selectPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className="pg-btn"
        disabled={currentPage === totalPages}
        onClick={next}
      >
        next
      </button>
    </section>
  );
};

export default Pagination;
