import PostsResponse from "../../models/blog/PostsResponse";

export default interface BlogRepository {
  createNewPost(
    title: string,
    content: string,
    imageUrl: string
  ): Promise<string>;

  getAllPosts(): Promise<PostsResponse[]>;

  deletePost(idItem: number): Promise<string>;

  updatePost(
    title: string,
    content: string,
    imageUrl: string | undefined,
    itemId: string | undefined
  ): Promise<string>;
}
