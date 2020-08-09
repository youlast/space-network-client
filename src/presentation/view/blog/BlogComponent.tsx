import React from 'react';

import './blog-style.css';

const BlogComponent = ():JSX.Element => {
  return (
    <div className='container'>
        <div className="row row-style">
          <h1>Create a new blog post</h1>
        </div>
        <div className="row row-style">
          <input type="text" placeholder='title of post...' />
        </div>
        <div className="row justify-content-center pt-3">
          <textarea  placeholder='text of post...' />
        </div>
        <div className='row justify-content-center pt-4'>
          <button className='btn btn-dark'>Post you post</button>
        </div>

    </div>
  )
};

export default BlogComponent;