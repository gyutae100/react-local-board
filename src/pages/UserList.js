import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";

const UserList = () => {
  return (
    <UsersConsumer>
      {({ state }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Link
              to="/Join"
              style={{
                width: "90px",
                border: "1px solid gray",
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "10px 10px 10px 10px"
              }}
            >
              회원가입
            </Link>
          </div>
          <hr></hr>

          <BootstrapTable data={state.userList}>
            <TableHeaderColumn isKey dataField="id">
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="userId">userId</TableHeaderColumn>
            <TableHeaderColumn dataField="nickName">nickName</TableHeaderColumn>
            <TableHeaderColumn dataField="password">password</TableHeaderColumn>
          </BootstrapTable>
        </div>
      )}
    </UsersConsumer>
  );
};

export default UserList;
