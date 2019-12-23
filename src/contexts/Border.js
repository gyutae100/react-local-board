import React, { createContext, useState, useCallback } from "react";

const BorderContext = createContext({
  state: { postList: [] },
  actions: {
    InsertPosts: () => {}
  }
});

const BorderProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const onHandleInsertPost = useCallback(
    (title, content) => {
      const newPost = {
        id: currentIdx,
        title: title,
        content: content
      };

      console.log(newPost);

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
    <BorderContext.Provider value={value}>{children}</BorderContext.Provider>
  );
};

const { Consumer: BorderConsumer } = BorderContext;

export { BorderProvider, BorderConsumer };

export default BorderContext;
