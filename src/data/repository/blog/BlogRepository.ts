export default interface BlogRepository {
  createNewPost(title: string, content: string, imageUrl: string): unknown;

  getAllPosts(): Promise<void>;
}
