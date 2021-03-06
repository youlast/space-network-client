export default interface PostsResponse {
  id: number;
  title: string;
  content: string;
  imagePost?: string;
  authorPost: string;
  datePost: Date;
}
