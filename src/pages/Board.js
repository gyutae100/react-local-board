import React from "react";
import { BoardConsumer } from "../contexts/Board";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <UsersConsumer>
      {({ state: UsersState }) => (
        <BoardConsumer>
          {({ state: BorderState }) => (
            <div>
              {UsersState.isLoggedIn == true ? (
                <Link style={{ height: "30px" }} to="/InsertPost">
                  글 등록
                </Link>
              ) : (
                <p>로그인 후 글 작성이 가능합니다.</p>
              )}

              <hr></hr>
              <table style={{ border: "1px solid black" }}>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                </tr>

                {BorderState.postList.map((currentPost, idx) => {
                  const url = `/ViewPost?id=${currentPost.id}`;
                  return (
                    <Link key={idx} to={url}>
                      <tr>
                        <td>{currentPost.id}</td>
                        <td>{currentPost.title}</td>
                      </tr>
                    </Link>
                  );
                })}
              </table>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default Board;
