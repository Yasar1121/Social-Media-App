import { useContext, useEffect, useState } from "react";
import PostHome from "./Post";
import { PostList as pd } from "../store/PostListStore";
import Welcome from "./Welcome";
import LoadingS from "./loading";
const PostList = () => {
  const { postList, fetching } = useContext(pd);

  return (
    <>
      {fetching && <LoadingS />}
      {!fetching && postList.length === 0 && <Welcome />}
      {!fetching &&
        postList.map((post) => <PostHome key={post.id} post={post} />)}
    </>
  );
};
export default PostList;
