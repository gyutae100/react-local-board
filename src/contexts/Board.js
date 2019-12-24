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
        userIdx
      };

      setPostList(postList.concat(newPost));
      setCurrentIdx(parseInt(currentIdx + 1));
    },
    [postList, currentIdx]
  );

  const value = {
    state: { postList },
    actions: { onHandleInsertPost }
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

const { Consumer: BoardConsumer } = BoardContext;

export { BoardProvider, BoardConsumer };

export default BoardContext;
