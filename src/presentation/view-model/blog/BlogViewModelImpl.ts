import ViewModel from "../ViewModel";
import BlogViewModel from "./BlogViewModel";

export default class BlogViewModelImpl extends  ViewModel implements BlogViewModel{
  public titlePost:string;
  public textPost:string;

  private readonly blogRepository:any;
  constructor(blogRepository:any) {
    super();

    this.blogRepository = blogRepository;

    this.titlePost = '';
    this.textPost = '';
  }

  public setTitlePost = (value:string):void => {
  this.titlePost = value;
  super.notifyViewAboutChanges();
  };

  public setTextPost = (value:string):void => {
    this.textPost = value;
    super.notifyViewAboutChanges()
  };

  public onCreateNewPost = async ():Promise<void> => {

    try {
      await this.blogRepository.createNewPost(this.titlePost,this.textPost);
    }
    catch (e) {
      alert(e)
    }
  }

}