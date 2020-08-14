import React from 'react';

import './blog-style.css';
import BlogViewModel from "../../view-model/blog/BlogViewModel";

interface Props {
  blogViewModel:BlogViewModel;
}

class BlogCreatePost extends React.Component<Props>{
  private readonly blogViewModel:BlogViewModel;
  constructor(props:Props) {
    super(props);

    const {blogViewModel} = this.props;

    this.blogViewModel = blogViewModel;
  }

  public componentDidMount(): void {
    this.blogViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.blogViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({

    });
  }


  public render(){
    return (
      <div className='container'>
        <div className="row row-style">
          <h1>Create a new blog post</h1>
        </div>
        <div className="row justify-content-center">
          Choose language
        </div>
        <div className="row  justify-content-center" >
          <div className="btn-group btn-group-toggle" data-toggle="buttons">

            <label className="btn btn-light">
              <input type="radio" name="options" id="option2" /> Russian
            </label>
            <label className="btn btn-light">
              <input type="radio" name="options" id="option3" checked /> English
            </label>
          </div>
        </div>
        <div className="row row-style">
          <input type="text" placeholder='title of post...' onChange={(e:React.FormEvent<HTMLInputElement>) =>
            this.blogViewModel.setTitlePost(e.currentTarget.value)} />
        </div>
        <div className="row justify-content-center pt-3" >

          <textarea  placeholder='text of post...' onChange={(e:React.FormEvent<HTMLTextAreaElement>) =>
            this.blogViewModel.setTextPost(e.currentTarget.value)} />
        </div>
        <div className='row justify-content-center pt-4'>
          <button className='btn btn-dark' onClick={():Promise<void> => this.blogViewModel.onCreateNewPost()}>Post you post</button>
        </div>

      </div>
    )
  }

};

export default BlogCreatePost;