import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalContext";


const Navbar = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const [searchVal, setSearch] = useState<string>("");

  const profilePicURL = ""+localStorage.getItem("profilePicURL");
  const displayName = localStorage.getItem("displayName");

  const { page, setSearchState, setPageState } = useContext(GlobalContext);

  useEffect(() => {
    if (localStorage.getItem("displayName") !== null) {
        setLogged(true);
    }
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSearchState(searchVal);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand mr-0">
        <img className="profile-pic mr-2" src={profilePicURL} alt="User Profile Pic" />
        { displayName }
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-lg-auto mr-auto">
          <li className="nav-item active">
            <a className="nav-link">
              {page == "search" ? 
                <form className="form-inline my-2 my-lg-0" onSubmit={e => handleSubmit(e)}>
                  <input id="search" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)}/>
                </form>
                :
                <h3>
                  My Library
                </h3>
              }
            </a>
          </li>
          <li className="nav-item active d-flex align-items-center" style={{ "position": "relative", "left": (page == "search" ? "42%" : "120%") }}>
            <a className="nav-link">
              {page == "search" ?
                <Link to={"/my-library"} onClick={() => setPageState("library")}>
                  My Library
                </Link>
                :
                <Link to={"/search"} onClick={() => setPageState("search")}>
                  Search
                </Link>
              }
            </a>
          </li>
        </ul>
        {/* <ul className="navbar-nav mr-auto ml-auto">
        </ul> */}
        <form className="form-inline my-2 my-lg-0">
          <button className="btn btn-outline-success my-2 my-sm-0" style={{"color": "#1DB954"}} type="submit"><i className="fas fa-sign-out-alt"></i></button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
