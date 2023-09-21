export default function Header() {
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;  //gets login user as an object
  // const userInfo = JSON.parse(localStorage.getItem(userInfo));

  //Logout function
  function logOut(){
    localStorage.removeItem("userInfo");
  }

  return (
    <>
      <header className="header navbar-expand-lg fixed-top ">
        <div className="container-wrap ">
          <div className="header-area header-padding">
            <div className="logo">
              <a href="/">
                <img
                  src="/assets/img/logo/logo-dark.png"
                  alt=""
                  className="logo-dark"
                />
                <img
                  src="/assets/img/logo/logo-white.png"
                  alt=""
                  className="logo-white"
                />
              </a>
            </div>
            <div className="header-navbar">
              <nav className="navbar">
                <div className="collapse navbar-collapse" id="main_nav">
                  <ul className="navbar-nav ">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="/"
                        
                      >
                        {" "}
                        Home{" "}
                      </a>
                    </li>
                   

                    <li className="nav-item">
                      <a
                        className="nav-link  "
                        href="/all-blogs"
                      >
                        {" "}
                        All Blogs{" "}
                      </a>
                    
                    </li>

                    <li className="nav-item ">
                      <a
                        className="nav-link   "
                        href="/"
                      >
                        {" "}
                         authors{" "}
                      </a>
                    
                    </li>

                    {/* <li className="nav-item ">
                      <a
                        className="nav-link"
                        href="/"
                      >
                        {" "}
                        posts{" "}
                      </a>
                    </li> */}

                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        {" "}
                        contact{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="header-right ">
              <div className=" widget-search">
                  <form action="">
                      <input type="search" id="" placeholder="Search ...."/>
                      <a href="/" className="btn-submit"><i className="las la-search"></i></a>
                  </form>
              </div>

              <div className="botton-sub ecaps">
                {!userInfo &&
                  <a href="/login" className="btn-subscribe ">
                    sign in
                  </a>
                }
                {userInfo &&
                  <ul className="">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle ajh" href="/" data-toggle="dropdown"> {userInfo.firstName} </a>
                      <ul className="dropdown-menu fade-up">
                          <li>
                              <a className="dropdown-item " href="/create-blog">Create New Blog </a>
                          </li>
                          <li>
                              <a className="dropdown-item" href={`/blogs/${userInfo._id}`}>My blogs</a>
                          </li>
                          <li>
                              <a className="dropdown-item" href="/" onClick={logOut}>Logout</a>
                          </li>
                      </ul>
                    </li>
                  </ul>
                  }
              </div>
            
            

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main_nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
