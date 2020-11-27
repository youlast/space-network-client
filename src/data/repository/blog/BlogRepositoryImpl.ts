import BlogRepository from "./BlogRepository";
import RequestOptions from "../../api/RequestOptions";
import ApiHelper from "../../api/ApiHelper";
import { APPLICATION_SERVER } from "../../../constants";
import PostsResponse from "../../models/blog/PostsResponse";
import AuthRepository from "../auth/AuthRepository";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";

export default class BlogRepositoryImpl implements BlogRepository {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public createNewPost = (
    title: string,
    content: string,
    imageUrl: string
  ): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions();
    requestOptions.addHeader(
      "Authorization",
      this.authRepository.getAccessToken()
    );

    requestOptions.setBody(
      JSON.stringify({
        title,
        content,
        imagePost: imageUrl,
        username: this.authRepository.getUserName(),
      })
    );

    return ApiHelper.fetchPostRaw(
      `${APPLICATION_SERVER}/api/blog/create_post`,
      requestOptions
    );
  };

  public getAllPosts = (): Promise<PostsResponse[]> => {
    return ApiHelper.fetchGetJson(`${APPLICATION_SERVER}/api/blog/posts`);
  };

  public deletePost = (idPost: number): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions();
    requestOptions.addHeader(
      "Authorization",
      this.authRepository.getAccessToken()
    );

    requestOptions.setBody(JSON.stringify({ idPost }));

    return ApiHelper.fetchDeleteRaw(
      `${APPLICATION_SERVER}/api/blog/delete_post`,
      requestOptions
    );
  };

  public updatePost = (postByIdData: PostsResponse): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions();
    requestOptions.addHeader(
      "Authorization",
      this.authRepository.getAccessToken()
    );

    requestOptions.setBody(
      JSON.stringify({
        ...postByIdData,
      })
    );

    return ApiHelper.fetchPutRaw(
      `${APPLICATION_SERVER}/api/blog/update_post`,
      requestOptions
    );
  };
}
