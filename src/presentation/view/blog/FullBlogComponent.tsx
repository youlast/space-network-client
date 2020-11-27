import React from "react";

import Modal from "react-bootstrap/Modal";
import FullBlogViewModel from "../../view-model/blog/FullBlogViewModel";
import BaseView from "../BaseView";
import PostResponse from "../../../data/models/blog/PostsResponse";
import BlogViewModel from "../../view-model/blog/BlogViewModel";

interface Props {
  fullBlogViewModel: FullBlogViewModel;
  blogViewModel: BlogViewModel;
}

interface State {
  postByIdData?: PostResponse;
  isShowFieldsForChanges: boolean;
  isShowDeleteModal: boolean;
}

export default class FullBlogComponent
  extends React.Component<Props, State>
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
      isShowDeleteModal: fullBlogViewModel.isShowDeleteModal,
    };
  }

  public componentDidMount() {
    this.fullBlogViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.fullBlogViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
    this.setState({
      postByIdData: this.fullBlogViewModel.postByIdData,
      isShowFieldsForChanges: this.fullBlogViewModel.isShowFieldsForChanges,
      isShowDeleteModal: this.fullBlogViewModel.isShowDeleteModal,
    });
  }

  public render(): JSX.Element {
    const {
      postByIdData,
      isShowFieldsForChanges,
      isShowDeleteModal,
    } = this.state;
    return (
      <>
        <div className="p-4">
          <div className="container">
            {isShowFieldsForChanges && postByIdData && (
              <div style={{ paddingTop: "100px", textAlign: "center" }}>
                <form
                  onKeyPress={(e): void => {
                    if (e.which === 13) {
                      this.fullBlogViewModel.onSubmitChangedPost(postByIdData);
                    }
                  }}
                >
                  <div className="text-center">
                    <div className="form-group row">
                      <label className="col-xl-1 col-lg-3 col-form-label">
                        Title
                      </label>
                      <div className="col-xl-8 col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={postByIdData.title}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            postByIdData.title = e.currentTarget.value;
                            this.setState({ postByIdData });
                          }}
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
                          defaultValue={postByIdData.imagePost}
                          onChange={(
                            e: React.FormEvent<HTMLInputElement>
                          ): void => {
                            postByIdData.imagePost = e.currentTarget.value;
                            this.setState({ postByIdData });
                          }}
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
                          defaultValue={postByIdData.content}
                          rows={postByIdData.content.length >= 800 ? 10 : 5}
                          onChange={(
                            e: React.FormEvent<HTMLTextAreaElement>
                          ) => {
                            postByIdData.content = e.currentTarget.value;
                            this.setState({ postByIdData });
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-dark"
                        onClick={(e): void => {
                          e.preventDefault();
                          this.fullBlogViewModel.onSubmitChangedPost(
                            postByIdData
                          );
                        }}
                      >
                        Submit changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {postByIdData && !isShowFieldsForChanges && (
              <div>
                <div>
                  <h2 className="pt-4">
                    <div className="row">
                      <div className="col-10">
                        <div>{postByIdData.title}</div>
                      </div>
                      <div className="col-2">
                        <div className="d-flex justify-content-around">
                          <button
                            className="btn btn-danger"
                            onClick={(): void => {
                              this.fullBlogViewModel.setIsShowDeleteModal(true);
                            }}
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
                    {postByIdData.imagePost && (
                      <img
                        src={postByIdData.imagePost}
                        alt="post"
                        style={{ width: "1000px" }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div>{postByIdData.content}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODAL FOR DELETE POST*/}
        <Modal
          show={isShowDeleteModal}
          onHide={(): void => {
            if (isShowDeleteModal) {
              this.fullBlogViewModel.setIsShowDeleteModal(false);
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Удаление поста</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <span style={{ color: "black" }}>
              Вы уверены, что хотите удалить этот пост?
            </span>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={(): void => {
                this.fullBlogViewModel.setIsShowDeleteModal(false);
              }}
            >
              Отмена
            </button>

            <button
              className="ml-2 mr-3 btn btn-danger px-4"
              type="button"
              onClick={(): void => {
                this.blogViewModel.onDeletePost(postByIdData?.id as number);
              }}
            >
              Удалить автосервис
            </button>
          </Modal.Footer>
        </Modal>

        {/*END OF MODAL FOR DELETE AUTOSERVICE*/}
      </>
    );
  }
}
