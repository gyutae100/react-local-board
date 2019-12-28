import React, { useState, useCallback } from "react";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
const Join = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const onHandleSetId = e => {
    setId(e.target.value);
  };

  const onHandleSetPassword = e => {
    setPassword(e.target.value);
  };

  const onHandleSetNickName = e => {
    setNickName(e.target.value);
  };

  const onHandleRegisteUser = (e, { onHandleRegistUser }) => {
    onHandleRegistUser(id, password, nickName);
  };

  return (
    <UsersConsumer>
      {({ actions }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <input placeholder="id" name="id" onChange={onHandleSetId}></input>

          <input
            placeholder="password"
            name="password"
            onChange={onHandleSetPassword}
          ></input>

          <input
            placeholder="nickname"
            name="nickName"
            onChange={onHandleSetNickName}
          ></input>

          <Link
            style={{
              display: "flex",
              flexDirection: "Column",
              border: "1px solid gray",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
            to="/UserList?currentPage=1"
            onClick={e => onHandleRegisteUser(e, actions)}
          >
            등록
          </Link>
        </div>
      )}
    </UsersConsumer>
  );
};

export default Join;
