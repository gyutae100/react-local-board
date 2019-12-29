import React, { useState, useCallback } from "react";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";

const InsertPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onHandleInsertPost = useCallback(
    (e, { onHandleInsertPost }, { loginUserId }) => {
      onHandleInsertPost(title, content, loginUserId);
    },
    [title, content]
  );

  const onHandleSetContent = useCallback(
    e => {
      setContent(e.target.value);
    },
    [content]
  );

  const onHandleSetTitle = useCallback(
    e => {
      setTitle(e.target.value);
    },
    [content]
  );

  return (
    <UsersConsumer>
      {({ state: usersState }) => (
        <BoardConsumer>
          {({ actions: boardActions }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <textarea
                style={{ height: "30px", width: "300px" }}
                onChange={onHandleSetTitle}
              ></textarea>

              <textarea
                style={{ height: "300px", width: "300px", marginTop: "20px" }}
                onChange={onHandleSetContent}
              ></textarea>

              <div>
                <Link
                  style={{ height: "30px" }}
                  to="/Board?currentPage=1"
                  onClick={e => onHandleInsertPost(e, boardActions, usersState)}
                >
                  등록
                </Link>

                <Link
                  style={{ height: "30px", marginLeft: "10px" }}
                  to="/Board?currentPage=1"
                >
                  취소
                </Link>
              </div>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default InsertPost;
