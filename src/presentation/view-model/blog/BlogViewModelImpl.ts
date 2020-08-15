import ViewModel from "../ViewModel";
import BlogViewModel from "./BlogViewModel";
import BaseView from "../../view/BaseView";
import BlogRepository from "../../../data/repository/blog/BlogRepository";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";

export default class BlogViewModelImpl extends ViewModel
  implements BlogViewModel {
  public titlePost: string;
  public textPost: string;
  public imageUrl: string;
  public allPosts: any;

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

  public getPosts = (): void => {
    try {
      this.blogRepository
        .getAllPosts()
        .then((res: any) => this.setPostsData(res));
    } catch (e) {
      alert(e);
    }
  };

  public onCreateNewPost = async (): Promise<void> => {
    try {
      //@ts-ignore
      await this.blogRepository
        .createNewPost(this.titlePost, this.textPost, this.imageUrl)
        .then((res: any) => {
          if (res === "OK") {
            BrowserHistoryHelper.moveToAndReload("/blog");
          } else {
            alert(res);
          }
        });
    } catch (e) {
      alert(e);
    }
  };

  private setPostsData = (posts: any): void => {
    this.allPosts = posts;
    super.notifyViewAboutChanges();
  };
}
