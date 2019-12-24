import React, { createContext, useState, useCallback } from "react";

const BoardContext = createContext({
  state: { postList: [] },
  actions: {
    InsertPosts: () => {}
  }
});

const BoardProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const onHandleInsertPost = useCallback(
    (title, content, userIdx) => {
      const newPost = {
        id: currentIdx,
        title,
        content,
        userIdx: parseInt(userIdx)
      };

      setPostList(postList.concat(newPost));
      setCurrentIdx(parseInt(currentIdx + 1));
    },
    [postList, currentIdx]
  );

  const onHandleRemovePost = useCallback(
    removePostId => {
      setPostList(
        postList.filter(currentPostInfo => {
          //removePostId는 StringType이다.
          return removePostId != currentPostInfo.id;
        })
      );
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
