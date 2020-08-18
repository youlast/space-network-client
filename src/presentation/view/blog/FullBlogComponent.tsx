import React from "react";
import FullBlogViewModel from "../../view-model/blog/FullBlogViewModel";
import BaseView from "../BaseView";
import PostsResponse from "../../../data/models/blog/PostsResponse";
import BlogViewModel from "../../view-model/blog/BlogViewModel";

interface Props {
  fullBlogViewModel: FullBlogViewModel;
  blogViewModel: BlogViewModel;
}

interface State {
  postByIdData: PostsResponse[];
}

export default class FullBlogComponent extends React.Component<Props, State>
  implements BaseView {
  private readonly fullBlogViewModel: FullBlogViewModel;
  private readonly blogViewModel: BlogViewModel;

  constructor(props: Props) {
    super(props);

    const { fullBlogViewModel, blogViewModel } = this.props;

    this.fullBlogViewModel = fullBlogViewModel;
    this.blogViewModel = blogViewModel;

    this.state = {
      postByIdData: fullBlogViewModel.postByIdData,
    };
  }

  public componentDidMount() {
    this.fullBlogViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.fullBlogViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      postByIdData: this.fullBlogViewModel.postByIdData,
    });
  }

  public render(): JSX.Element {
    const { postByIdData } = this.state;
    return (
      <div className="p-4">
        {postByIdData &&
          postByIdData.map((post: PostsResponse) => {
            return (
              <>
                {Object.keys(post).map((columnName: string) => {
                  if (columnName === "id") return undefined;

                  if (columnName === "imagePost" && post.imagePost) {
                    return (
                      <div className="pt-2 text-center">
                        <img
                          src={post.imagePost}
                          alt="post"
                          style={{ width: "1000px" }}
                        />
                      </div>
                    );
                  }
                  if (columnName === "title") {
                    return (
                      <h2 className="pt-4">
                        <div>{post.title}</div>
                      </h2>
                    );
                  }

                  if (columnName === "content") {
                    return <div>{post.content}</div>;
                  }
                })}

                <div>
                  <button
                    className="btn btn-primary"
                    onClick={(): Promise<void> =>
                      this.blogViewModel.onDeletePost(post.id)
                    }
                  >
                    Delete post
                  </button>
                </div>
              </>
            );
          })}
      </div>
    );
  }
}
