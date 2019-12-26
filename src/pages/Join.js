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
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>ID</p>
            <input name="id" onChange={onHandleSetId}></input>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>PASSWORD</p>
            <input name="password" onChange={onHandleSetPassword}></input>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>NICKNAME</p>
            <input name="nickName" onChange={onHandleSetNickName}></input>
          </div>

          <Link
            style={{ height: "30px" }}
            to="/UserList?currentPage=0"
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
