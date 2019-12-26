import React, { createContext, useState, useCallback } from "react";

const UsersContext = createContext({
  state: { userList: [] },
  action: {
    InsertUser: () => {}
  }
});

const LS_USER_LIST = "LS_USER_LIST";
const LS_NEXT_USER_ID = "LS_NEXT_USER_ID";
const LS_IS_LOGGED_IN = "LS_IS_LOGGED_IN";
const LS_LOGIN_USER_ID = "LS_LOGIN_USER_ID";

const initUserList = () => {
  const savedUserList = JSON.parse(localStorage.getItem(LS_USER_LIST));

  if (savedUserList === null) {
    return [];
  }
  return savedUserList;
};

const initNextUserId = () => {
  const savedUserId = JSON.parse(localStorage.getItem(LS_NEXT_USER_ID));

  if (savedUserId === null) {
    return 0;
  }
  return savedUserId;
};

const initIsLoggedIn = () => {
  const savedIsLoggedIn = JSON.parse(localStorage.getItem(LS_IS_LOGGED_IN));

  if (savedIsLoggedIn === null) {
    return false;
  }
  return savedIsLoggedIn;
};

const initLoginUserId = () => {
  const savedLoginUserId = JSON.parse(localStorage.getItem(LS_LOGIN_USER_ID));

  if (savedLoginUserId === null) {
    return -1;
  }
  return savedLoginUserId;
};

const UsersProvider = ({ children }) => {
  const [userList, setUserList] = useState(initUserList());
  const [nextUserId, setNextUserId] = useState(initNextUserId());
  const [isLoggedIn, setIsLoggedIn] = useState(initIsLoggedIn());
  const [loginUserId, setloginUserId] = useState(initLoginUserId());

  const saveInfoToLocalStorage = useCallback(
    (
      updatedUserList,
      updatedNextUserId,
      updatedIsLoggedIn,
      updatedLoginUserId
    ) => {
      if (updatedUserList !== null)
        localStorage.setItem(LS_USER_LIST, JSON.stringify(updatedUserList));

      if (updatedNextUserId !== null)
        localStorage.setItem(
          LS_NEXT_USER_ID,
          JSON.stringify(updatedNextUserId)
        );

      if (updatedIsLoggedIn !== null)
        localStorage.setItem(
          LS_IS_LOGGED_IN,
          JSON.stringify(updatedIsLoggedIn)
        );

      if (updatedLoginUserId !== null)
        localStorage.setItem(
          LS_LOGIN_USER_ID,
          JSON.stringify(updatedLoginUserId)
        );
    }
  );

  const onHandleRegistUser = useCallback(
    (id, password, nickName) => {
      const newUser = {
        id,
        password,
        nickName,
        userId: nextUserId
      };

      const updatedUserList = userList.concat(newUser);
      setUserList(updatedUserList);
      const updatedNextUserId = parseInt(nextUserId + 1);
      setNextUserId(updatedNextUserId);

      saveInfoToLocalStorage(updatedUserList, updatedNextUserId, null, null);
    },
    [userList, setNextUserId]
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

      const isLoggedIn = true;
      setIsLoggedIn(isLoggedIn);
      const userId = userInfo.userId;
      setloginUserId(userId);

      saveInfoToLocalStorage(null, null, isLoggedIn, userId);

      return true;
    },
    [userList, loginUserId, isLoggedIn]
  );

  const onHandleLogOut = useCallback(() => {
    const isLoggedIn = false;
    setIsLoggedIn(isLoggedIn);
    const loginUserId = -1; //false 값으로 하면 0으로 인식되서 0번째 유저로 설정되더라
    setloginUserId(loginUserId);

    saveInfoToLocalStorage(null, null, isLoggedIn, loginUserId);
  }, []);

  const value = {
    state: { userList, loginUserId, isLoggedIn },
    actions: { onHandleRegistUser, onHandleTryLoggedIn, onHandleLogOut }
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const { Consumer: UsersConsumer } = UsersContext;

export { UsersProvider, UsersConsumer };

export default UsersContext;
