import { useContext, useRef } from "react";
import { PostList } from "../store/PostListStore";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userId = useRef();
  const title = useRef();
  const body = useRef();
  const tags = useRef();
  const reactions = useRef();

  const handle = (event) => {
    event.preventDefault();
    const userIdElement = userId.current.value;
    const titleElement = title.current.value;
    const bodyElement = body.current.value;
    const tagsElement = tags.current.value.split(" ");
    const reactionsElement = reactions.current.value;

    userId.current.value = "";
    title.current.value = "";
    body.current.value = "";
    tags.current.value = "";
    reactions.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleElement,
        body: bodyElement,
        reactions: reactionsElement,
        userId: userIdElement,
        tags: tagsElement,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
      });
  };

  return (
    <form className="Create" onSubmit={handle}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User-ID
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Enter your user Id"
          ref={userId}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you"
          ref={title}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Content
        </label>
        <textarea
          rows="4"
          type="text"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
          ref={body}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Hashtags
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
          ref={tags}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Reactions
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post ?"
          ref={reactions}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
