import { useContext } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { PostList } from "../store/PostListStore";
const PostHome = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <RiDeleteBack2Line />
            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-info hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          {post.reactions} Reacted{" "}
        </div>
      </div>
    </div>
  );
};
export default PostHome;
