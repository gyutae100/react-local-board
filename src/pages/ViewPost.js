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

  const [comment, setComment] = useState("");

  const onHandleSetTitle = e => {
    setTitle(e.target.value);
  };

  const onHandleSetContent = e => {
    setContent(e.target.value);
  };

  const onHandleSetComment = e => {
    setComment(e.target.value);
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

  const onHandleClickAddComment = ({ loginUserId }, { onHandleAddComment }) => {
    const result = onHandleAddComment(loginUserId, parseInt(query.id), comment);
    if (result) {
      alert("댓글 달기 성공");
      setComment("");
    }
  };

  const onHandleClickDeleteComment = (
    deleteCommentId,
    { onHandleDeleteComment }
  ) => {
    const result = onHandleDeleteComment(deleteCommentId);
    if (result) {
      alert("댓글 삭제 성공");
    }
  };

  const showNickName = ({ userList }, userId) => {
    const nickName = userList.find(userInfo => userId == userInfo.userId)
      .nickName;

    return nickName;
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid black",
                  borderRadius: "5px"
                }}
              >
                <p>
                  댓글 목록(
                  {boardState.commentList.reduce((prevValue, currentObj) => {
                    if (currentObj.postId == parseInt(query.id)) {
                      prevValue = prevValue + 1;
                    }
                    return prevValue;
                  }, 0)}
                  )
                </p>
                {boardState.commentList
                  .filter(commentObj => {
                    return parseInt(query.id) === commentObj.id;
                  })
                  .map(commentObj => {
                    return (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {" "}
                        {showNickName(usersState, commentObj.userId)}
                        <p> : </p>
                        {commentObj.comment}
                        {commentObj.userId === usersState.loginUserId && (
                          <button
                            onClick={() =>
                              onHandleClickDeleteComment(
                                commentObj.id,
                                boardActions
                              )
                            }
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    );
                  })}

                <input
                  placeholder="댓글 내용"
                  name="addComment"
                  onChange={onHandleSetComment}
                  value={comment}
                ></input>
                <button
                  onClick={() =>
                    onHandleClickAddComment(usersState, boardActions)
                  }
                >
                  댓글 달기
                </button>
              </div>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default ViewPost;
