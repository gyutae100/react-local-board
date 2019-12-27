import React, { useState } from "react";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
import qs from "qs";

const ViewPost = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onHandleClickRemovePostBtn = (e, { onHandleRemovePost }) => {
    onHandleRemovePost(query.id);
  };

  const isPossibleRemovePost = ({ postList }, { loginUserId }) => {
    console.log(postList);
    console.log(loginUserId);
    return postList.find(currentPost => currentPost.userIdx === loginUserId);
  };

  const isPossibleModifyPost = ({ postList }, { loginUserId }) => {
    console.log(postList);
    console.log(loginUserId);
    return postList.find(currentPost => currentPost.userIdx === loginUserId);
  };

  const getCurrentPostInfo = ({ postList }) => {
    console.log(postList);
    //query.id는 string타입이다.
    return postList.find(currentPost => currentPost.id === parseInt(query.id));
  };

  return (
    <UsersConsumer>
      {({ state: usersState }) => (
        <BoardConsumer>
          {({ state: boardState, actions: boardActions }) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    marginLeft: "10px",
                    padding: "10px 10px 10px 10px",
                    width: "3.5rem"
                  }}
                  to="/Board?currentPage=1"
                >
                  뒤로
                </Link>

                {isPossibleRemovePost(boardState, usersState) && (
                  <Link
                    style={{
                      border: "1px solid gray",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      padding: "10px 10px 10px 10px",
                      width: "3.5rem"
                    }}
                    to="/Board?currentPage=1"
                    onClick={e => onHandleClickRemovePostBtn(e, boardActions)}
                  >
                    삭제
                  </Link>
                )}

                {isPossibleModifyPost(boardState, usersState) && (
                  <div
                    style={{
                      border: "1px solid gray",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      padding: "10px 10px 10px 10px",
                      width: "3.5rem"
                    }}
                    onClick={e => onHandleClickRemovePostBtn(e, boardActions)}
                  >
                    {" "}
                    수정
                  </div>
                )}
              </div>

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
