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
          {allPosts &&
            allPosts.map((post: PostsResponse) => {
              return (
                <>
                  {Object.keys(post).map((columnName: string) => {
                    if (columnName === "id") return undefined;

                    if (columnName === "imagePost") {
                      return (
                        <div className="pt-2">
                          <img
                            src={post.imagePost}
                            alt="post"
                            style={{ width: "200px" }}
                          />
                        </div>
                      );
                    }
                    if (columnName === "title") {
                      return <h2 className="pt-4">{post.title}</h2>;
                    }
                    if (columnName === "content") {
                      return <div>{post.content}</div>;
                    }
                  })}
                  <div
                    style={{
                      height: "2px",
                      width: "100%",
                      background: "white",
                    }}
                  />
                </>
              );
            })}
        </div>
      </div>
    );
  }
}

export default BlogComponent;
