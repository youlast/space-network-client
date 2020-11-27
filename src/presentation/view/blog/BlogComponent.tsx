import React from "react";
import { Link } from "react-router-dom";
import BlogViewModel from "../../view-model/blog/BlogViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";
import PostComponent from "./PostComponent";

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
    this.blogViewModel.detachView(this);
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
            return <PostComponent post={post} key={`post_id_${post.id}`} />;
          })}
        </div>
      </div>
    );
  }
}

export default BlogComponent;
