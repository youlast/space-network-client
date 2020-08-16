import BlogRepository from "./BlogRepository";
import RequestOptions from "../../api/RequestOptions";
import ApiHelper from "../../api/ApiHelper";
import { APPLICATION_SERVER } from "../../../constants";
import PostsResponse from "../../models/blog/PostsResponse";
import AuthRepository from "../auth/AuthRepository";

export default class BlogRepositoryImpl implements BlogRepository {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public createNewPost = (
    title: string,
    content: string,
    imageUrl: string
  ): unknown => {
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
      })
    );

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/blog/create_post`,
      requestOptions
    ).then((res: any) => {
      return res.text();
    });
  };

  public getAllPosts = (): Promise<PostsResponse[]> => {
    return ApiHelper.fetchGetJson(`${APPLICATION_SERVER}/api/blog/posts`);
  };
}
