import React, { useState } from "react";
import { UsersConsumer } from "../contexts/Users";

const Home = () => {
  const showNickName = ({ userList }, { loginUserId }) => {
    const nickName = userList.find(userInfo => loginUserId == userInfo.userId)
      .nickName;

    return nickName;
  };

  return (
    <UsersConsumer>
      {({ state }) => (
        <div>
          {state.userList.map(i => {
            return <div></div>;
          })}

          {state.isLoggedIn == true ? (
            <p
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "row"
              }}
            >
              <p style={{ color: "blue" }}>{showNickName(state, state)}</p>님
              환영합니다.
            </p>
          ) : (
            <p>로그인 해주세요</p>
          )}
        </div>
      )}
    </UsersConsumer>
  );
};

export default Home;
