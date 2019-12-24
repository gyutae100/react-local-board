import React from "react";
import { Route } from "react-router-dom";
import InsertPost from "./pages/InsertPost";
import Board from "./pages/Board";
import NavTop from "./components/NavTop";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import Join from "./pages/Join";
import UserList from "./pages/UserList";
import Login from "./pages/Login";

import { UsersProvider } from "./contexts/Users";
import { BoardProvider } from "./contexts/Board";

function App() {
  return (
    <UsersProvider>
      <BoardProvider>
        <div>
          <div>
            <NavTop />
          </div>
          <div>
            <Route path="/" component={Home} exact={true} />
            <Route path="/Home" component={Home} exact={true} />
            <Route path="/Board" component={Board} exact={true} />
            <Route path="/InsertPost" component={InsertPost} />
            <Route path="/ViewPost" component={ViewPost} />
            <Route path="/Join" component={Join} />
            <Route path="/UserList" component={UserList} />
            <Route path="/Login" component={Login} />
          </div>
        </div>
      </BoardProvider>
    </UsersProvider>
  );
}

export default App;
