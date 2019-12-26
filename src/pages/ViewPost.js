import React from "react";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
import qs from "qs";

const ViewPost = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const onHandleClickRemovePostBtn = (e, { onHandleRemovePost }) => {
    onHandleRemovePost(query.id);
  };

  const isPossibleRemovePost = ({ postList }, { loginUserIdx }) => {
    return postList.find(currentPost => currentPost.userIdx === loginUserIdx);
  };

  const getCurrentPostInfo = ({ postList }) => {
    //query.id는 string타입이다.
    return postList.find(currentPost => currentPost.id == query.id);
  };

  return (
    <UsersConsumer>
      {({ state: usersState }) => (
        <BoardConsumer>
          {({ state: boardState, actions: boardActions }) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  padding: "10px 10px 10px 10px",
                  width: "3.5rem"
                }}
                to="/Board"
              >
                뒤로
              </Link>

              {isPossibleRemovePost(boardState, usersState) && (
                <Link
                  style={{ height: "30px", marginLeft: "10px" }}
                  to="/Board"
                  onClick={e => onHandleClickRemovePostBtn(e, boardActions)}
                >
                  삭제
                </Link>
              )}

              <hr />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p>
                  ID:
                  {getCurrentPostInfo(boardState).id}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p>TITLE:{getCurrentPostInfo(boardState).title}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p>CONTENT:{getCurrentPostInfo(boardState).content}</p>
              </div>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default ViewPost;
