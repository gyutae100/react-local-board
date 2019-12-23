import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/Boarder">게시판</Link>
        </li>
        <li>
          <Link to="/UserList">유저 리스트</Link>
        </li>
      </ul>
      <hr></hr>
    </div>
  );
};

export default Menu;
