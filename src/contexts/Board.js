//일반 게시판

import React, { createContext, useState, useCallback } from "react";

const BoardContext = createContext({
  state: { postList: [] },
  actions: {
    InsertPosts: () => {}
  }
});

const LS_POST_LIST = "LS_POST_LIST";
const LS_LAST_ID = "LS_LAST_ID";
const LS_COMMENT_LIST = "LS_COMMENT_LIST";
const LS_COMMENT_ID = "LS_COMMENT_ID";

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

const initCommentList = () => {
  const savedCommentList = JSON.parse(localStorage.getItem(LS_COMMENT_LIST));

  if (savedCommentList === null) {
    return [];
  }
  return savedCommentList;
};

const initCommentId = () => {
  const savedCommentId = JSON.parse(localStorage.getItem(LS_COMMENT_ID));

  if (savedCommentId === null) {
    return 0;
  }
  return savedCommentId;
};

const BoardProvider = ({ children }) => {
  const [postList, setPostList] = useState(initPostList());
  const [currentId, setcurrentId] = useState(initcurrentId());

  const [commentList, setCommentList] = useState(initCommentList());
  const [commentId, setCommentId] = useState(initCommentId());

  const SaveInfoToLocalStorage = useCallback(
    (lastPostList, lastId, lastCommentList, lastCommentId) => {
      if (lastPostList !== null)
        localStorage.setItem(LS_POST_LIST, JSON.stringify(lastPostList));

      if (lastId !== null) localStorage.setItem(LS_LAST_ID, lastId);

      if (lastCommentList !== null)
        localStorage.setItem(LS_COMMENT_LIST, JSON.stringify(lastCommentList));

      if (lastCommentId !== null)
        localStorage.setItem(LS_COMMENT_ID, lastCommentId);
    }
  );

  const onHandleInsertPost = useCallback(
    (title, content, userId) => {
      const newPost = {
        id: currentId,
        title,
        content,
        userIdx: parseInt(userId)
      };

      setPostList(postList.concat(newPost));
      setcurrentId(parseInt(currentId + 1));
      SaveInfoToLocalStorage(
        postList.concat(newPost),
        parseInt(currentId + 1),
        null,
        null
      );
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
      SaveInfoToLocalStorage(updatedPostList, currentId, null, null);
    },
    [postList]
  );

  const onHandleApplyModifedPost = useCallback(
    (modifiedPostId, title, content, userId) => {
      const modifiedPost = {
        id: parseInt(modifiedPostId),
        title,
        content,
        userIdx: parseInt(userId)
      };

      const modifiedPostList = postList.map(post => {
        if (post.id !== parseInt(modifiedPostId)) {
          return post;
        } else {
          return modifiedPost;
        }
      });

      console.log("mpl", modifiedPostList);
      setPostList(modifiedPostList);
      SaveInfoToLocalStorage(modifiedPostList, currentId, null, null);
    }
  );

  const onHandleAddComment = useCallback((loginUserId, postId, comment) => {
    const newComment = {
      id: commentId,
      userId: loginUserId,
      postId,
      comment
    };

    const updatedCommentList = commentList.concat(newComment);
    setCommentList(updatedCommentList);
    const updatedCommentId = commentId + 1;
    setCommentId(updatedCommentId);
    SaveInfoToLocalStorage(null, null, updatedCommentList, updatedCommentId);

    return true;
  });

  const onHandleDeleteComment = useCallback(deleteCommentId => {
    console.log("xxxxxxxxxxxxxx");
    const updatedCommentList = commentList.filter(currentCommentObj => {
      if (currentCommentObj.id === deleteCommentId) {
        return false;
      } else {
        return true;
      }
    });
    setCommentList(updatedCommentList);
    SaveInfoToLocalStorage(null, null, updatedCommentList, null);
  });

  const value = {
    state: { postList, commentList },
    actions: {
      onHandleInsertPost,
      onHandleRemovePost,
      onHandleApplyModifedPost,
      onHandleAddComment,
      onHandleDeleteComment
    }
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

const { Consumer: BoardConsumer } = BoardContext;

export { BoardProvider, BoardConsumer };

export default BoardContext;
