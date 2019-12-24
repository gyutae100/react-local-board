import React from "react";
import { Link } from "react-router-dom";
import { UsersConsumer } from "../contexts/Users";

const NavTop = () => {
  const onHandleClickLogOutButton = (e, { onHandleLogOut }) => {
    console.log(onHandleLogOut);
    onHandleLogOut();
  };

  return (
    <UsersConsumer>
      {({ state, actions }) => (
        <div>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/Board">게시판</Link>
            </li>
            <li>
              <Link to="/UserList">유저 리스트</Link>
            </li>
            {state.isLoggedIn == true ? (
              <li>
                <button onClick={e => onHandleClickLogOutButton(e, actions)}>
                  로그아웃
                </button>
              </li>
            ) : (
              <li>
                <Link to="/Login">로그인</Link>
              </li>
            )}
          </ul>
          <hr></hr>
        </div>
      )}
    </UsersConsumer>
  );
};

export default NavTop;
