import React, { useState } from "react";

import { UsersConsumer } from "../contexts/Users";
import { Link, withRouter } from "react-router-dom";
const LoggedIn = ({ location, match, history }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeId = e => {
    setId(e.target.value);
  };

  const handleOnChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleOnTryLoggedIn = (e, actions) => {
    console.log(actions.onHandleTryLoggedIn);
    const isSuccess = actions.onHandleTryLoggedIn(id, password);

    if (!isSuccess) {
      alert("로그인 정보가 정확하지 않습니다.");
      return false;
    }

    history.push("/");
    return true;
  };

  return (
    <UsersConsumer>
      {({ actions }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input placeholder={"id"} onChange={handleOnChangeId}></input>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              placeholder={"password"}
              onChange={handleOnChangePassword}
            ></input>
          </div>
          <button onClick={e => handleOnTryLoggedIn(e, actions)}>로그인</button>
        </div>
      )}
    </UsersConsumer>
  );
};

export default withRouter(LoggedIn);
