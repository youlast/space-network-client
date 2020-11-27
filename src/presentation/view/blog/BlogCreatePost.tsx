import React from "react";

import BlogViewModel from "../../view-model/blog/BlogViewModel";

interface Props {
  blogViewModel: BlogViewModel;
}

export default class BlogCreatePost extends React.Component<Props> {
  private readonly blogViewModel: BlogViewModel;
  constructor(props: Props) {
    super(props);

    const { blogViewModel } = this.props;

    this.blogViewModel = blogViewModel;
  }

  public componentDidMount(): void {
    this.blogViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.blogViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
    this.setState({});
  }

  public render() {
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row row-style">
          <h1>Create a new blog post</h1>
        </div>

        <div className="row row-style">
          <input
            type="text"
            placeholder="title of post..."
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.blogViewModel.setTitlePost(e.currentTarget.value)
            }
          />
        </div>

        <div className="row row-style">
          <input
            type="text"
            placeholder="image for post... (now only url)"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.blogViewModel.setImageUrl(e.currentTarget.value)
            }
          />
        </div>

        <div className="row justify-content-center pt-3">
          <textarea
            placeholder="text of post..."
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
              this.blogViewModel.setTextPost(e.currentTarget.value)
            }
          />
        </div>
        <div className="row justify-content-center pt-4">
          <button
            className="btn btn-dark"
            onClick={(): Promise<void> => this.blogViewModel.onCreateNewPost()}
          >
            Post you post
          </button>
        </div>
      </div>
    );
  }
}
