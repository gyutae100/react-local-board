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

  const onHandleSetTitle = e => {
    setTitle(e.target.value);
  };

  const onHandleSetContent = e => {
    setContent(e.target.value);
  };

  const onHandleClickRemovePostBtn = (e, { onHandleRemovePost }) => {
    onHandleRemovePost(query.id);
  };

  const onHandleClickModifyPostBtn = e => {
    setIsModifyMode(true);
  };

  const onHandleClickApplyModifiedPostBtn = (
    { loginUserId },
    { onHandleApplyModifedPost }
  ) => {
    onHandleApplyModifedPost(parseInt(query.id), title, content, loginUserId);
    setIsModifyMode(false);
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
              {/*수정 모드가 아닐 때 상단 기능 버튼 */}
              {!isModifyMode && (
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
                      onClick={e => onHandleClickModifyPostBtn(e)}
                    >
                      {" "}
                      수정
                    </div>
                  )}
                </div>
              )}

              <hr />

              {/*수정 모드가 아닐 때 하단 게시글 정보 */}
              {!isModifyMode && (
                <div>
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

              {/*수정 모드 하단 게시글 정보 */}
              {isModifyMode && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <textarea
                      style={{ height: "30px", width: "300px" }}
                      value={
                        title === ""
                          ? getCurrentPostInfo(boardState).title
                          : title
                      }
                      onChange={onHandleSetTitle}
                    ></textarea>

                    <textarea
                      style={{
                        height: "300px",
                        width: "300px",
                        marginTop: "20px"
                      }}
                      value={
                        content === ""
                          ? getCurrentPostInfo(boardState).content
                          : content
                      }
                      onChange={onHandleSetContent}
                    ></textarea>

                    <div>
                      <button
                        style={{ height: "30px" }}
                        to="/Board"
                        onClick={() =>
                          onHandleClickApplyModifiedPostBtn(
                            usersState,
                            boardActions
                          )
                        }
                      >
                        수정
                      </button>

                      <button
                        style={{ height: "30px", marginLeft: "10px" }}
                        to="/Board"
                        onClick={() => setIsModifyMode(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default ViewPost;
