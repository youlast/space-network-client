import React from 'react'
// @ts-ignore
import {Link} from 'react-router-dom'

const NavbarComponent = ():JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{background:'white'}}>
      <a className="navbar-brand" href="/">SPACE NETWORK</a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {/*there will be left part of header buttons*/}
        </ul>
           <Link to='/sign_in'><button className="btn btn-dark mr-2 " type="submit">Sign In</button></Link>
        <Link to='/sign_up'><button className="btn btn-dark mr-2" type="submit">Sign Up</button></Link>
      </div>
    </nav>
  )
}

export default  NavbarComponent