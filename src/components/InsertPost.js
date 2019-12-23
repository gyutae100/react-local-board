import React, { useState, useCallback } from "react";
import { BorderConsumer } from "../contexts/Border";
import { Link } from "react-router-dom";

const InsertPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onHandleInsertPost = useCallback(
    (e, { onHandleInsertPost }) => {
      onHandleInsertPost(title, content);
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
    <BorderConsumer>
      {({ actions }) => (
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
              to="/Boarder"
              onClick={e => onHandleInsertPost(e, actions)}
            >
              등록
            </Link>

            <Link style={{ height: "30px", marginLeft: "10px" }} to="/Boarder">
              취소
            </Link>
          </div>
        </div>
      )}
    </BorderConsumer>
  );
};

export default InsertPost;
