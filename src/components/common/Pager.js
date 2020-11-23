import React from "react";
import usePaging from "../../hooks/paging";

const Pager = ({ total = 0, currentPage = 1, onPageSelected, ...rest }) => {
  const { pages, pageNumbers } = usePaging(total, currentPage);

  const onPageNumberClick = (pageNumber) => {
    onPageSelected(pageNumber);
  };

  console.debug({ pages, currentPage });

  return (
    <div className="flex inline justify-between" {...rest}>
      {currentPage !== 1 && (
        <span
          className="mx-1 text-sm"
          onClick={() => onPageNumberClick(currentPage - 1)}
        >
          Prev
        </span>
      )}
      {pageNumbers.map((i) => (
        <span
          className={
            currentPage === i
              ? "mx-1 px-1 py-1 rounded-full bg-gray-800 text-white"
              : "mx-1"
          }
          key={`page-${i}`}
          onClick={() => onPageNumberClick(i)}
        >
          {i}
        </span>
      ))}
      {currentPage < pages && (
        <span
          className="mx-1 text-sm"
          onClick={() => onPageNumberClick(currentPage + 1)}
        >
          Next
        </span>
      )}
    </div>
  );
};

export default Pager;
