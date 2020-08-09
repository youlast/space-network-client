import React from 'react';
//@ts-ignore
import {Link} from 'react-router-dom'

const BlogComponent = ():JSX.Element => {
  return <div className='container'>
    <div className="row justify-content-end pt-3">
      <Link to='/create_post'>
          <button className='btn btn-warning'>
              Create a new post
          </button>
      </Link>
    </div>
  </div>
}

export default BlogComponent;