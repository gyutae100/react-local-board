import React from "react";

import { Link } from "react-router-dom";

const PageNation = ({
  totalElement /*총 페이지 갯수*/,
  currentPage /*현재 페이지*/,
  pageSize /*페이지 내 개시물 갯수*/,
  pageNationSize /*페이지 네이션 내 표기 할 페이지 갯수 */
}) => {
  const totalPage = Math.ceil(totalElement / pageSize);
  const startPage = currentPage - (currentPage % pageNationSize);

  const tmp = startPage + pageNationSize;

  const endPage = tmp > totalPage ? totalPage : tmp;

  const isPrev = Math.floor(currentPage / pageNationSize) > 0 ? true : false;
  const isNext =
    (startPage + pageNationSize - 1) * pageSize < totalElement ? true : false;

  const pages = [];

  console.log("totalElement", totalElement);
  console.log("currentPage", currentPage);
  console.log("pageSize", pageSize);
  console.log("totalPage", totalPage);
  console.log("startPage", startPage);
  console.log("endPage", endPage);
  console.log("isPrev", isPrev);
  console.log("isNext", isNext);
  console.log("pageNationSize", pageNationSize);

  for (let idx = startPage; idx < endPage; idx++) {
    pages.push(
      <Link to={`/UserList?currentPage=${idx}`} style={{ marginLeft: "10px" }}>
        {idx + 1}
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
        <Link to={`/UserList?currentPage=${startPage - 1}`}>Prev</Link>
      )}
      {pages}
      {isNext && <Link to={`/UserList?currentPage=${endPage}`}>next</Link>}
    </div>
  );
};

export default PageNation;
