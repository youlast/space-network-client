import PostsResponse from "../../models/blog/PostsResponse";

export default interface BlogRepository {
  createNewPost(title: string, content: string, imageUrl: string): unknown;

  getAllPosts(): Promise<PostsResponse[]>;
}
