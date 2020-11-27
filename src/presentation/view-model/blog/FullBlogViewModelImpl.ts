import ViewModel from "../ViewModel";
import BlogRepository from "../../../data/repository/blog/BlogRepository";
import BaseView from "../../view/BaseView";
import FullBlogViewModel from "./FullBlogViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";

export default class FullBlogViewModelImpl
  extends ViewModel
  implements FullBlogViewModel {
  public allPosts: PostsResponse[];
  public postByIdData?: PostsResponse;
  public isShowFieldsForChanges: boolean;
  public changedTitle: string | undefined;
  public changedImage: string | undefined;
  public changedContent: string | undefined;
  public isShowDeleteModal: boolean;

  private itemId: string | undefined;
  private readonly blogRepository: BlogRepository;

  constructor(blogRepository: BlogRepository) {
    super();

    this.blogRepository = blogRepository;

    this.allPosts = [];
    this.postByIdData = undefined;
    this.isShowFieldsForChanges = false;
    this.changedTitle = "";
    this.changedImage = "";
    this.changedContent = "";
    this.isShowDeleteModal = false;
  }

  public attachView = async (baseView: BaseView): Promise<void> => {
    super.attachView(baseView);

    this.itemId =
      new URLSearchParams(window.location.search).get("id") || undefined;

    this.allPosts = await this.blogRepository.getAllPosts();
    this.getPostById(this.allPosts);
    super.notifyViewAboutChanges();
  };

  public detachView = (baseView: BaseView): void => {
    super.detachView(baseView);

    this.allPosts = [];
    this.postByIdData = undefined;
    this.isShowFieldsForChanges = false;
    this.changedTitle = "";
    this.changedImage = "";
    this.changedContent = "";
    this.isShowDeleteModal = false;
  };

  public setChangedTitle = (value: string): void => {
    this.changedTitle = value;
    super.notifyViewAboutChanges();
  };

  public setChangedImage = (value: string): void => {
    this.changedImage = value;
    super.notifyViewAboutChanges();
  };

  public setChangedContent = (value: string): void => {
    this.changedContent = value;
    super.notifyViewAboutChanges();
  };

  public setIsShowFieldsForChanges = (value: boolean): void => {
    this.isShowFieldsForChanges = value;
    this.clearUpdatedItems();
    super.notifyViewAboutChanges();
  };

  public setIsShowDeleteModal = (isShowDeleteModal: boolean): void => {
    this.isShowDeleteModal = isShowDeleteModal;
    super.notifyViewAboutChanges();
  };

  public onSubmitChangedPost = async (
    postByIdData: PostsResponse
  ): Promise<void> => {
    try {
      await this.blogRepository.updatePost(postByIdData);
      this.setIsShowDeleteModal(false);
      window.location.reload();
      BrowserHistoryHelper.moveTo(`/blog/item?id=${postByIdData.id}`);
    } catch (e) {
      alert(e);
    }
  };

  private getPostById = (posts: PostsResponse[]): void => {
    this.postByIdData = posts.filter(
      (post: PostsResponse) => post.id === Number(this.itemId)
    )[0];
    super.notifyViewAboutChanges();
  };

  private clearUpdatedItems = (): void => {
    this.changedTitle = undefined;
    this.changedImage = undefined;
    this.changedContent = undefined;
  };
}
