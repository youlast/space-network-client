import React from "react";
//@ts-ignore
import { Link } from "react-router-dom";
import BlogViewModel from "../../view-model/blog/BlogViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";

interface Props {
  blogViewModel: BlogViewModel;
}

interface State {
  allPosts: PostsResponse[];
}

class BlogComponent extends React.Component<Props, State> {
  private readonly blogViewModel: BlogViewModel;

  constructor(props: Props) {
    super(props);

    const { blogViewModel } = this.props;

    this.blogViewModel = blogViewModel;

    this.state = {
      allPosts: blogViewModel.allPosts,
    };
  }

  public componentDidMount(): void {
    this.blogViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.blogViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      allPosts: this.blogViewModel.allPosts,
    });
  }

  render() {
    const { allPosts } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-end pt-3">
          <Link to="/blog/create_post">
            <button className="btn btn-warning">Create a new post</button>
          </Link>
        </div>

        <div>
          {allPosts.map((post: PostsResponse) => {
            const transformationDate = new Date(post.datePost);

            return (
              <div className="post-preview pt-4">
                <div className="col-4">
                  <div className="d-flex justify-content-around post-meta">
                    <div>Author post: {post.authorPost}</div>
                    <div>
                      {`${transformationDate.getDate()}.${
                        transformationDate.getMonth() <= 10
                          ? "0" + transformationDate.getMonth()
                          : transformationDate.getMonth()
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
                <div className="post-body">
                  {post.content && post.content.length >= 400
                    ? post.content.slice(0, 400)
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
          })}
        </div>
      </div>
    );
  }
}

export default BlogComponent;
