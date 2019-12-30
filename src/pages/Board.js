import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
import qs from "qs";
import PageNation from "../components/PageNation";

const pageSize = 5;
const pageNationSize = 5;

const Board = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  return (
    <UsersConsumer>
      {({ state: UsersState }) => (
        <BoardConsumer>
          {({ state: BorderState }) => (
            <div>
              {UsersState.isLoggedIn === true ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Link
                    style={{
                      border: "1px solid gray",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      padding: "10px 10px 10px 10px"
                    }}
                    to="/InsertPost"
                  >
                    글 등록
                  </Link>
                </div>
              ) : (
                <p>로그인 후 글 작성이 가능합니다.</p>
              )}

              <hr></hr>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {BorderState.postList
                  .filter((currentPost, idx) => {
                    return (
                      (query.currentPage - 1) * pageSize <= idx &&
                      (query.currentPage - 1) * pageSize + pageSize > idx
                    );
                  })
                  .map((currentPost, idx) => {
                    const url = `/ViewPost?id=${currentPost.id}`;
                    return (
                      <Link key={idx} to={url}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "Column",
                            border: "1px solid gray",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            width: "500px"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <p>제목: {currentPost.title}</p>
                            <p>
                              댓글:
                              {BorderState.commentList.reduce(
                                (prevValue, currentObj) => {
                                  if (currentObj.postId == currentPost.id) {
                                    prevValue = prevValue + 1;
                                  }
                                  return prevValue;
                                },
                                0
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              <PageNation
                totalElement={BorderState.postList.length}
                currentPage={parseInt(query.currentPage)}
                pageSize={pageSize}
                pageNationSize={pageNationSize}
                addresFormat={"/Board"}
              />
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default Board;
