import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Link
                    style={{
                      border: "1px solid gray",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      padding: "10px 10px 10px 10px"
                    }}
                    to="/InsertPost"
                  >
                    글 등록
                  </Link>
                </div>
              ) : (
                <p>로그인 후 글 작성이 가능합니다.</p>
              )}

              <hr></hr>

              <BootstrapTable data={BorderState.postList}>
                <TableHeaderColumn isKey dataField="id">
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="id">id</TableHeaderColumn>
                <TableHeaderColumn dataField="title">title</TableHeaderColumn>
              </BootstrapTable>
            </div>
          )}
        </BoardConsumer>
      )}
    </UsersConsumer>
  );
};

export default Board;
