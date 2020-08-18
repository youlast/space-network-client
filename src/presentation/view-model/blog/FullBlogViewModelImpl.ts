import ViewModel from "../ViewModel";
import BlogRepository from "../../../data/repository/blog/BlogRepository";
import BaseView from "../../view/BaseView";
import FullBlogViewModel from "./FullBlogViewModel";
import PostsResponse from "../../../data/models/blog/PostsResponse";

export default class FullBlogViewModelImpl extends ViewModel
  implements FullBlogViewModel {
  public allPosts: PostsResponse[];
  public postByIdData: PostsResponse[];

  private itemId: string | undefined;
  private readonly blogRepository: BlogRepository;

  constructor(blogRepository: BlogRepository) {
    super();

    this.blogRepository = blogRepository;

    this.allPosts = [];
    this.postByIdData = [];
  }

  public attachView = (baseView: BaseView): void => {
    super.attachView(baseView);

    this.itemId =
      new URLSearchParams(window.location.search).get("id") || undefined;

    if (!this.itemId) {
      alert("Cannot detect item ID. Please reload page");
      return;
    } else {
      this.getAllPosts();
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
}
