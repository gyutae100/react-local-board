import React from "react";
import { Link } from "react-router-dom";
import { UsersConsumer } from "../contexts/Users";

const onHandleClickLogOutButton = (e, { onHandleLogOut }) => {
  onHandleLogOut();
};

const showNickName = ({ userList }, { loginUserId }) => {
  const nickName = userList.find(userInfo => loginUserId == userInfo.userId)
    .nickName;

  return nickName;
};

const NavTop = () => {
  return (
    <UsersConsumer>
      {({ state, actions }) => (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Link
              to="/"
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "10px 10px 10px 10px"
              }}
            >
              홈
            </Link>

            <Link
              to="/Board?currentPage=1"
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "10px 10px 10px 10px"
              }}
            >
              일반 게시판
            </Link>

            <Link
              to="/UserList?currentPage=1"
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "10px 10px 10px 10px"
              }}
            >
              유저 리스트
            </Link>

            {state.isLoggedIn && (
              <h
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "10px"
                }}
              >
                {showNickName(state, state)}님 환영합니다.
              </h>
            )}

            {state.isLoggedIn == true ? (
              <button
                onClick={e => onHandleClickLogOutButton(e, actions)}
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  padding: "10px 10px 10px 10px"
                }}
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/Login"
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  padding: "10px 10px 10px 10px"
                }}
              >
                로그인
              </Link>
            )}
          </div>
          <hr style={{ borderTop: "2px solid gray" }}></hr>
        </div>
      )}
    </UsersConsumer>
  );
};

export default NavTop;
