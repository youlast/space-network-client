import BaseViewModel from "../BaseViewModel";

export default  interface BlogViewModel extends BaseViewModel{
  setTitlePost(value:string):void;

  setTextPost(value:string):void

  onCreateNewPost():Promise<void>
}