import BlogRepository from "./BlogRepository";
import RequestOptions from "../../api/RequestOptions";
import ApiHelper from "../../api/ApiHelper";
import {APPLICATION_SERVER} from "../../../constants";

export default class BlogRepositoryImpl implements BlogRepository {
  public createNewPost = (title:string,content:string):unknown => {
      const requestOptions:RequestOptions = new RequestOptions();

      requestOptions.setBody(
        JSON.stringify({
        title,
        content
      }));

      return ApiHelper.fetchPostJson(`${APPLICATION_SERVER}/api/create_post`,requestOptions)
  }
}