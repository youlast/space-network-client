import React from "react";
import FullBlogViewModel from "../../view-model/blog/FullBlogViewModel";
import BaseView from "../BaseView";
import PostsResponse from "../../../data/models/blog/PostsResponse";
import BlogViewModel from "../../view-model/blog/BlogViewModel";
import { BrowserRouter } from "react-router-dom";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";

interface Props {
  fullBlogViewModel: FullBlogViewModel;
  blogViewModel: BlogViewModel;
}

interface State {
  postByIdData: PostsResponse[];
  isShowFieldsForChanges: boolean;
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
      isShowFieldsForChanges: fullBlogViewModel.isShowFieldsForChanges,
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
      isShowFieldsForChanges: this.fullBlogViewModel.isShowFieldsForChanges,
    });
  }

  public render(): JSX.Element {
    const { postByIdData, isShowFieldsForChanges } = this.state;
    return (
      <div className="p-4">
        <div className="container ">
          {isShowFieldsForChanges && postByIdData
            ? postByIdData.map((post: PostsResponse) => {
                return (
                  <div>
                    <form>
                      <div className="text-center">
                        <div className="form-group row">
                          <label className="col-xl-1 col-lg-3 col-form-label">
                            Title
                          </label>
                          <div className=" col-xl-8 col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={post.title}
                              onChange={(
                                e: React.FormEvent<HTMLInputElement>
                              ) =>
                                this.fullBlogViewModel.setChangedTitle(
                                  e.currentTarget.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-xl-1 col-lg-3 col-form-label">
                            Image
                          </label>
                          <div className=" col-xl-8 col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={post.imagePost}
                              onChange={(
                                e: React.FormEvent<HTMLInputElement>
                              ): void =>
                                this.fullBlogViewModel.setChangedImage(
                                  e.currentTarget.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-xl-1 col-lg-3 col-form-label">
                            Content
                          </label>
                          <div className=" col-xl-8 col-lg-6">
                            <textarea
                              className="form-control"
                              defaultValue={post.content}
                              rows={post.content.length >= 800 ? 10 : 5}
                              onChange={(
                                e: React.FormEvent<HTMLTextAreaElement>
                              ) =>
                                this.fullBlogViewModel.setChangedContent(
                                  e.currentTarget.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            className="btn btn-dark"
                            onClick={(): Promise<void> =>
                              this.fullBlogViewModel.onSubmitChangedPost()
                            }
                          >
                            Submit changes
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                );
              })
            : undefined}

          {postByIdData &&
            !isShowFieldsForChanges &&
            postByIdData.map((post: PostsResponse) => {
              return (
                <div>
                  <div>
                    <h2 className="pt-4">
                      <div className="row">
                        <div className="col-10">
                          <div>{post.title}</div>
                        </div>
                        <div className="col-2">
                          <div className="d-flex justify-content-around">
                            <button
                              className="btn btn-danger"
                              onClick={(): Promise<void> =>
                                this.blogViewModel.onDeletePost(post.id)
                              }
                            >
                              Delete
                            </button>

                            <button
                              className="btn btn-warning"
                              onClick={(): void =>
                                this.fullBlogViewModel.setIsShowFieldsForChanges(
                                  true
                                )
                              }
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </h2>
                    <div className="pt-2 text-center">
                      {post.imagePost && (
                        <img
                          src={post.imagePost}
                          alt="post"
                          style={{ width: "1000px" }}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div>{post.content}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
