import React from "react";

import { Link } from "react-router-dom";

const PageNation = ({
  totalElement /*총 페이지 갯수*/,
  currentPage /*현재 페이지*/,
  pageSize /*페이지 내 개시물 갯수*/,
  pageNationSize /*페이지 네이션 내 표기 할 페이지 갯수 */,
  addresFormat
}) => {
  const totalPage = Math.ceil(totalElement / pageSize);

  const startPage =
    Math.ceil(currentPage / pageNationSize) * pageNationSize -
    (pageNationSize - 1);

  const tmp = startPage + pageNationSize - 1;

  const endPage = tmp > totalPage ? totalPage : tmp;

  const isPrev =
    Math.floor(currentPage / (pageNationSize + 1)) > 0 ? true : false;
  const isNext =
    (startPage + pageNationSize - 1) * pageSize < totalElement ? true : false;

  const pages = [];
  console.log("=====================================");
  console.log("totalElement", totalElement);
  console.log("currentPage", currentPage);
  console.log("pageSize", pageSize);
  console.log("totalPage", totalPage);
  console.log("startPage", startPage);
  console.log("endPage", endPage);
  console.log("isPrev", isPrev);
  console.log("isNext", isNext);
  console.log("pageNationSize", pageNationSize);

  for (let idx = startPage; idx <= endPage; idx++) {
    pages.push(
      <Link
        to={`${addresFormat}?currentPage=${idx}`}
        style={
          idx === currentPage
            ? { marginLeft: "10px", color: "red" }
            : { marginLeft: "10px" }
        }
      >
        {idx}
      </Link>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {isPrev && (
        <Link to={`${addresFormat}?currentPage=${startPage - 1}`}>Prev</Link>
      )}
      {pages}
      {isNext && (
        <Link to={`${addresFormat}?currentPage=${endPage + 1}`}>next</Link>
      )}
    </div>
  );
};

export default PageNation;
