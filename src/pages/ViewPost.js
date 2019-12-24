import React from "react";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
import qs from "qs";

const ViewPost = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return (
    <UsersConsumer>
      {({ state: usersState }) => (
        <BoardConsumer>
          {({ state: boardState }) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link style={{ height: "30px", marginLeft: "10px" }} to="/Board">
                뒤로
              </Link>

              {usersState.loginUserIdx ===
                boardState.postList[query.id].userIdx && <button>삭제</button>}

              <hr />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p>ID:</p>
                {boardState.postList[query.id].id}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p>TITLE:</p>
                {boardState.postList[query.id].title}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p>CONTENT:</p>
                {boardState.postList[query.id].content}
              </div>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default ViewPost;
