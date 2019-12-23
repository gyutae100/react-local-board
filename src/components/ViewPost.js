import React from "react";
import { BorderConsumer } from "../contexts/Border";
import { Link } from "react-router-dom";
import qs from "qs";

const ViewPost = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return (
    <BorderConsumer>
      {({ state }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <p>ID:</p>
            {state.postList[query.id].id}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <p>TITLE:</p>
            {state.postList[query.id].title}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <p>CONTENT:</p>
            {state.postList[query.id].content}
          </div>

          <Link style={{ height: "30px", marginLeft: "10px" }} to="/Boarder">
            뒤로
          </Link>
        </div>
      )}
    </BorderConsumer>
  );
};

export default ViewPost;
