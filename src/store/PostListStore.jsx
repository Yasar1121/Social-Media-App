import { useCallback, useEffect, useState } from "react";
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (current, action) => {
  let newPostList = current;
  if (action.type === "DELETE") {
    newPostList = current.filter((post) => post.id !== action.payload.postId);
  } else if (action.type === "ADD") {
    newPostList = [action.payload, ...current];
  } else if (action.type === "ADD_INITIAL") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatcher] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatcher({
      type: "ADD",
      payload: post,
    });
  };
  const addInitialPosts = (posts) => {
    dispatcher({
      type: "ADD_INITIAL",
      payload: {
        posts,
      },
    });
  };
  const deletePost = useCallback(
    (postId) => {
      dispatcher({
        type: "DELETE",
        payload: { postId },
      });
    },
    [dispatcher]
  );

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <PostList.Provider value={{ postList, fetching, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
