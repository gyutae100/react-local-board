import React from "react";
import { Route } from "react-router-dom";
import InsertPost from "./components/InsertPost";
import Boarder from "./components/Boarder";
import Menu from "./components/Menu";
import Home from "./components/Home";
import ViewPost from "./components/ViewPost";
import Join from "./components/Join";
import UserList from "./components/UserList";

import { UsersProvider } from "./contexts/Users";
import { BorderProvider } from "./contexts/Border";

function App() {
  return (
    <UsersProvider>
      <BorderProvider>
        <div>
          <div>
            <Menu />
          </div>
          <div>
            <Route path="/" component={Home} exact={true} />
            <Route path="/Home" component={Home} exact={true} />
            <Route path="/Boarder" component={Boarder} exact={true} />
            <Route path="/InsertPost" component={InsertPost} />
            <Route path="/ViewPost" component={ViewPost} />
            <Route path="/Join" component={Join} />
            <Route path="/UserList" component={UserList} />
          </div>
        </div>
      </BorderProvider>
    </UsersProvider>
  );
}

export default App;
