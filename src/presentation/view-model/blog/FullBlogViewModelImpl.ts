import ViewModel from "../ViewModel";
import BlogRepository from "../../../data/repository/blog/BlogRepository";
import BaseView from "../../view/BaseView";
import FullBlogViewModel from "./FullBlogViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";

export default class FullBlogViewModelImpl extends ViewModel
  implements FullBlogViewModel {
  public allPosts: PostsResponse[];
  public postByIdData: PostsResponse[];
  public isShowFieldsForChanges: boolean;
  public changedTitle: string | undefined;
  public changedImage: string | undefined;
  public changedContent: string | undefined;

  private itemId: string | undefined;
  private readonly blogRepository: BlogRepository;

  constructor(blogRepository: BlogRepository) {
    super();

    this.blogRepository = blogRepository;

    this.allPosts = [];
    this.postByIdData = [];

    this.isShowFieldsForChanges = false;

    //changed values
    this.changedTitle = "";
    this.changedImage = "";
    this.changedContent = "";
  }

  public attachView = (baseView: BaseView): void => {
    super.attachView(baseView);
    {
      BrowserHistoryHelper.getHistory();
    }
    this.itemId =
      new URLSearchParams(window.location.search).get("id") || undefined;

    this.getAllPosts();

    if (window.location.pathname === "http://localhost:3000/blog/item?") {
      BrowserHistoryHelper.moveTo("/blog");
    }
  };

  public getAllPosts = async (): Promise<void> => {
    try {
      await this.blogRepository
        .getAllPosts()
        .then((res: PostsResponse[]) => this.setPostsData(res));
    } catch (e) {
      alert(e);
    }
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
    this.checkOnUpdates();
    super.notifyViewAboutChanges();
  };

  public onSubmitChangedPost = async (): Promise<void> => {
    try {
      await this.blogRepository.updatePost(
        this.changedTitle,
        this.changedContent,
        this.changedImage,
        this.itemId
      );
      BrowserHistoryHelper.moveTo("/blog/?");
      this.getAllPosts();
    } catch (e) {
      BrowserHistoryHelper.moveTo("/blog/?");
    }
  };

  private getPostById = (posts: PostsResponse[]): void => {
    this.postByIdData = posts.filter(
      (post: PostsResponse) => post.id === Number(this.itemId)
    );

    super.notifyViewAboutChanges();
  };

  private setPostsData = (posts: PostsResponse[]): void => {
    this.allPosts = posts;
    this.getPostById(posts);
    super.notifyViewAboutChanges();
  };

  private clearUpdatedItems = (): void => {
    this.changedTitle = undefined;
    this.changedImage = undefined;
    this.changedContent = undefined;
  };

  private checkOnUpdates = (): void => {
    if (this.allPosts.length >= 1) {
      if (!this.changedTitle) {
        this.postByIdData.map((post: PostsResponse) => {
          this.changedTitle = post.title;

          super.notifyViewAboutChanges();
        });
      }

      if (!this.changedImage) {
        this.postByIdData.map((post: PostsResponse) => {
          this.changedImage = post.imagePost;

          super.notifyViewAboutChanges();
        });
      }

      if (!this.changedContent) {
        this.postByIdData.map((post: PostsResponse) => {
          this.changedContent = post.content;

          super.notifyViewAboutChanges();
        });
      }
    }
  };
}
