import React from "react";
import { Route } from "react-router-dom";
import InsertPost from "./components/InsertPost";
import Boarder from "./components/Boarder";
import Menu from "./components/Menu";
import Home from "./components/Home";
import { BorderProvider } from "./contexts/Border";
import ViewPost from "./components/ViewPost";

function App() {
  return (
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
        </div>
      </div>
    </BorderProvider>
  );
}

export default App;
