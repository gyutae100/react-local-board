import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <UsersConsumer>
      {({ state: UsersState }) => (
        <BoardConsumer>
          {({ state: BorderState }) => (
            <div>
              {UsersState.isLoggedIn == true ? (
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
                {BorderState.postList.map((currentPost, idx) => {
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
                          <p>{currentPost.title}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default Board;
