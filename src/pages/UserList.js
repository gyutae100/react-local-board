import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UsersConsumer } from "../contexts/Users";
import { Link } from "react-router-dom";
import PageNation from "../components/PageNation";
import qs from "qs";

const pageSize = 5;
const pageNationSize = 5;

const UserList = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

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

          <BootstrapTable
            //페이지네이션
            data={state.userList.filter(
              (element, idx) =>
                (query.currentPage - 1) * pageSize <= idx &&
                (query.currentPage - 1) * pageSize + pageSize > idx
            )}
          >
            <TableHeaderColumn isKey dataField="id">
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="userId">userId</TableHeaderColumn>
            <TableHeaderColumn dataField="nickName">nickName</TableHeaderColumn>
            <TableHeaderColumn dataField="password">password</TableHeaderColumn>
          </BootstrapTable>

          <PageNation
            totalElement={state.userList.length}
            currentPage={parseInt(query.currentPage)}
            pageSize={pageSize}
            pageNationSize={pageNationSize}
            addresFormat={"/UserList"}
          />
        </div>
      )}
    </UsersConsumer>
  );
};

export default UserList;
