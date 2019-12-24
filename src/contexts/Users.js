import React, { createContext, useState, useCallback } from "react";

const UsersContext = createContext({
  state: { userList: [] },
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

      console.log("loginUserId", userInfo.userIdx);

      setIsLoggedIn(true);
      setLoginUserIdx(userInfo.userIdx);

      console.log("isLoggedIn", isLoggedIn);

      console.log("loginUserIdx", loginUserIdx);

      return true;
    },
    [userList, loginUserIdx, isLoggedIn]
  );

  const onHandleLogOut = useCallback(() => {
    setIsLoggedIn(false);
    setLoginUserIdx(-1);
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
