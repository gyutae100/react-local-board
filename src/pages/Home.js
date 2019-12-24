import React, { useState } from "react";
import { UsersConsumer } from "../contexts/Users";

const Home = () => {
  console.log("Home");

  return (
    <UsersConsumer>
      {({ state }) => (
        <div>
          {state.userList.map(i => {
            return <div></div>;
          })}

          {state.isLoggedIn == true ? (
            <p>{state.loginUserIdx}님 환영합니다.</p>
          ) : (
            <p>로그인 해주세요</p>
          )}
        </div>
      )}
    </UsersConsumer>
  );
};

export default Home;
