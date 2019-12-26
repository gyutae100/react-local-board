import React, { createContext, useState, useCallback } from "react";

const BoardContext = createContext({
  state: { postList: [] },
  actions: {
    InsertPosts: () => {}
  }
});

const BoardProvider = ({ children }) => {
  const LS_POST_LIST = "LS_POST_LIST";
  const LS_LAST_ID = "LS_LAST_ID";

  const initPostList = () => {
    const savedPostList = JSON.parse(localStorage.getItem(LS_POST_LIST));

    if (savedPostList === null) {
      return [];
    }

    return savedPostList;
  };

  const initcurrentId = () => {
    const savedLastId = JSON.parse(localStorage.getItem(LS_LAST_ID));

    if (savedLastId === null) {
      return 0;
    }
    return savedLastId;
  };

  const [postList, setPostList] = useState(initPostList());
  const [currentId, setcurrentId] = useState(initcurrentId());

  const SaveInfoToLocalStorage = useCallback((lastPostList, lastId) => {
    localStorage.setItem(LS_POST_LIST, JSON.stringify(lastPostList));
    localStorage.setItem(LS_LAST_ID, lastId);
  });

  const onHandleInsertPost = useCallback(
    (title, content, userIdx) => {
      const newPost = {
        id: currentId,
        title,
        content,
        userIdx: parseInt(userIdx)
      };

      setPostList(postList.concat(newPost));
      setcurrentId(parseInt(currentId + 1));
      SaveInfoToLocalStorage(postList.concat(newPost), parseInt(currentId + 1));
    },
    [postList, currentId]
  );

  const onHandleRemovePost = useCallback(
    removePostId => {
      const updatedPostList = postList.filter(currentPostInfo => {
        //removePostId는 StringType이다.
        return removePostId != currentPostInfo.id;
      });
      setPostList(updatedPostList);
      SaveInfoToLocalStorage(updatedPostList, currentId);
    },
    [postList]
  );

  const value = {
    state: { postList },
    actions: { onHandleInsertPost, onHandleRemovePost }
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

const { Consumer: BoardConsumer } = BoardContext;

export { BoardProvider, BoardConsumer };

export default BoardContext;
