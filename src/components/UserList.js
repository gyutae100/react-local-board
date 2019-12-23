import React from "react";

import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
const UserList = () => {
  return (
    <UsersConsumer>
      {({ state }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/Join">회원가입</Link>
          <hr></hr>

          <table style={{ border: "1px solid black" }}>
            <tr>
              <th>IDX</th>
              <th>ID</th>
              <th>NCINAME</th>
              <th>PASSWORD</th>
            </tr>

            {state.userList.map(currentUserInfo => {
              return (
                <tr>
                  <td>{currentUserInfo.userIdx}</td>
                  <td>{currentUserInfo.id}</td>{" "}
                  <td>{currentUserInfo.nickName}</td>{" "}
                  <td>{currentUserInfo.password}</td>{" "}
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </UsersConsumer>
  );
};

export default UserList;
