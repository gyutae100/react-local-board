import React, { createContext, useState, useCallback } from "react";

const UsersContext = createContext({
  state: { userList: [] },
  action: {
    InsertUser: () => {}
  }
});

const UsersProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [currentUserIdx, setCurrentUserIdx] = useState(0);

  const onHandleRegistUser = useCallback(
    (id, password, nickName) => {
      const newUser = {
        id,
        password,
        nickName,
        userIdx: currentUserIdx
      };

      setUserList(userList.concat(newUser));
      setCurrentUserIdx(parseInt(currentUserIdx + 1));
    },
    [userList, setCurrentUserIdx]
  );

  const value = {
    state: { userList },
    actions: { onHandleRegistUser }
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const { Consumer: UsersConsumer } = UsersContext;

export { UsersProvider, UsersConsumer };

export default UsersContext;
