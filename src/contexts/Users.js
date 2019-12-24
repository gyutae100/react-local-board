import React, { createContext, useState, useCallback } from "react";
import { stringify } from "qs";

const UsersContext = createContext({
  state: { userList: [JSON.parse(localStorage.getItem("USER_LIST"))] },
  action: {
    InsertUser: () => {}
  }
});

const UsersProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [NextUserIdx, setNextUserIdx] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserIdx, setLoginUserIdx] = useState(false);

  const onHandleRegistUser = useCallback(
    (id, password, nickName) => {
      const newUser = {
        id,
        password,
        nickName,
        userIdx: NextUserIdx
      };

      setUserList(userList.concat(newUser));
      setNextUserIdx(parseInt(NextUserIdx + 1));
      localStorage.setItem("USER_LIST", JSON.stringify(userList));
    },
    [userList, setNextUserIdx]
  );

  const onHandleTryLoggedIn = useCallback(
    (id, password) => {
      const isSuccess =
        userList.find(userInfo => {
          return userInfo.id === id && userInfo.password === password;
        }) != undefined;

      if (!isSuccess) {
        return false;
      }

      const userInfo = userList.find(userInfo => {
        return userInfo.id === id;
      });

      setIsLoggedIn(true);
      setLoginUserIdx(userInfo.userIdx);

      return true;
    },
    [userList, loginUserIdx, isLoggedIn]
  );

  const onHandleLogOut = useCallback(() => {
    setIsLoggedIn(false);
    setLoginUserIdx(-1); //false 값으로 하면 0으로 인식되서 0번째 유저로 설정되더라
  }, []);

  const value = {
    state: { userList, loginUserIdx, isLoggedIn },
    actions: { onHandleRegistUser, onHandleTryLoggedIn, onHandleLogOut }
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const { Consumer: UsersConsumer } = UsersContext;

export { UsersProvider, UsersConsumer };

export default UsersContext;
