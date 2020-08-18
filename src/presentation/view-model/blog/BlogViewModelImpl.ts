import ViewModel from "../ViewModel";
import BlogViewModel from "./BlogViewModel";
import BaseView from "../../view/BaseView";
import BlogRepository from "../../../data/repository/blog/BlogRepository";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";
import PostsResponse from "../../../data/models/blog/PostsResponse";

export default class BlogViewModelImpl extends ViewModel
  implements BlogViewModel {
  public titlePost: string;
  public textPost: string;
  public imageUrl: string;
  public allPosts: PostsResponse[];

  private readonly blogRepository: BlogRepository;
  constructor(blogRepository: BlogRepository) {
    super();

    this.blogRepository = blogRepository;

    this.titlePost = "";
    this.textPost = "";
    this.imageUrl = "";
    this.allPosts = [];
  }

  public attachView = (baseView: BaseView): void => {
    super.attachView(baseView);
    this.getPosts();
  };

  public setTitlePost = (value: string): void => {
    this.titlePost = value;
    super.notifyViewAboutChanges();
  };

  public setTextPost = (value: string): void => {
    this.textPost = value;
    super.notifyViewAboutChanges();
  };

  public setImageUrl = (value?: string): void => {
    if (value) {
      this.imageUrl = value;
      super.notifyViewAboutChanges();
    }
  };

  public getPosts = async (): Promise<void> => {
    try {
      await this.blogRepository
        .getAllPosts()
        .then((res: PostsResponse[]) => this.setPostsData(res));
    } catch (e) {
      alert(e);
    }
  };

  public onCreateNewPost = async (): Promise<void> => {
    try {
      //@ts-ignore
      await this.blogRepository
        .createNewPost(this.titlePost, this.textPost, this.imageUrl)
        .then((res: string) => {
          if (res === "Created" || res === "OK") {
            BrowserHistoryHelper.moveToAndReload("/blog?");
          } else {
            alert(res);
          }
        });
    } catch (e) {
      alert(e);
    }
  };

  public onDeletePost = async (idItem: number): Promise<void> => {
    this.allPosts = this.allPosts.filter(
      (post: PostsResponse) => post.id !== idItem
    );
    super.notifyViewAboutChanges();
    try {
      await this.blogRepository.deletePost(idItem);
      BrowserHistoryHelper.moveToAndReload("/blog?");
    } catch (e) {
      alert(e);
    }
  };

  private setPostsData = (posts: PostsResponse[]): void => {
    this.allPosts = posts;
    super.notifyViewAboutChanges();
  };
}
