import React from 'react'

const NavbarComponent = ():JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{background:'white'}}>
      <a className="navbar-brand" href="#">SPACE NETWORK</a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {/*there will be left part of header buttons*/}
        </ul>
            <button className="btn btn-dark mr-2 " type="submit">Sign In</button>
            <button className="btn btn-dark mr-2" type="submit">Sign Up</button>
      </div>
    </nav>
  )
}

export default  NavbarComponent