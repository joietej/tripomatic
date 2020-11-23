import React from "react";

const getRoundValue = (value, divider) =>
  value > divider ? Math.round(value / divider) : 1;
const getPages = (total, pageSize) => getRoundValue(total, pageSize);

const createPages = (current, total) => {
  const items = [];
  for (let index = 0; index < 5; index++) {
    if (current + index <= total) items.push(current + index);
  }
  const diff = 5 - items.length;
  if (diff && current > diff) {
    for (let index = 1; index < diff+1; index++) {
      items.push(current - index);
    }
  }
  return items.sort((a,b)=> a - b);
};

const usePaging = (totalItems, currentPageNumber, pageSize = 8) => {
  const pages = React.useMemo(() => getPages(totalItems, pageSize), [
    totalItems,
    pageSize,
  ]);
  const pageNumbers = React.useMemo(
    () => createPages(currentPageNumber, pages),
    [pages, currentPageNumber]
  );

  return { pages, pageNumbers };
};

export default usePaging;
