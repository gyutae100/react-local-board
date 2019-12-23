import React from "react";
import { BorderConsumer } from "../contexts/Border";
import { Link } from "react-router-dom";

const Border = () => {
  return (
    <BorderConsumer>
      {({ state }) => (
        <div>
          <Link style={{ height: "30px" }} to="/InsertPost">
            글 등록
          </Link>

          <hr></hr>
          <table style={{ border: "1px solid black" }}>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
            </tr>

            {state.postList.map(currentPost => {
              const url = `/ViewPost?id=${currentPost.id}`;
              return (
                <Link to={url}>
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
    </BorderConsumer>
  );
};

export default Border;
