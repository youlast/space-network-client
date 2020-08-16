import BlogRepository from "./BlogRepository";
import RequestOptions from "../../api/RequestOptions";
import ApiHelper from "../../api/ApiHelper";
import { APPLICATION_SERVER } from "../../../constants";
import PostsResponse from "../../models/blog/PostsResponse";

export default class BlogRepositoryImpl implements BlogRepository {
  public createNewPost = (
    title: string,
    content: string,
    imageUrl: string
  ): unknown => {
    const requestOptions: RequestOptions = new RequestOptions();

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
