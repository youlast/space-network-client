import React from "react";
import { Link } from "react-router-dom";
import PostsResponse from "../../../data/models/blog/PostsResponse";

interface Props {
  post: PostsResponse;
}

const PostComponent = ({ post }: Props): JSX.Element => {
  const transformationDate = new Date(post.datePost);
  return (
    <div className="post-preview pt-4">
      <div className="col-4 pl-0">
        <div className="d-flex justify-content-between post-meta">
          <div>Author of post: {post.authorPost}</div>
          <div>
            {`${transformationDate.getDate()}.${
              transformationDate.getMonth() + 1
            }.${transformationDate.getFullYear()}`}{" "}
            at{" "}
            {`${transformationDate.getHours()}:${
              transformationDate.getMinutes() <= 9
                ? "0" + transformationDate.getMinutes()
                : transformationDate.getMinutes()
            }`}
          </div>
        </div>
      </div>

      <div>
        <h2 className="post-title">
          <Link to={`/blog/item?id=${post.id}`}>{post.title}</Link>
        </h2>
      </div>
      <div className="post-body pb-2">
        {post.content && post.content.length >= 200
          ? post.content.slice(0, 200)
          : post.content}
        <div className="pl-2" style={{ display: "initial" }}>
          <Link to={`/blog/item?id=${post.id}`}>Read More</Link>
        </div>
      </div>
      <div
        style={{
          height: "2px",
          width: "100%",
          background: "white",
        }}
      />
    </div>
  );
};

export default PostComponent;
