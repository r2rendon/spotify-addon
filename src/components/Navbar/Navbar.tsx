import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as ROUTES from "../../constants/routes";
import { auth } from "../../firebase/config";

const Navbar = ({ setSearchValue }:any) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const profilePicURL = ""+localStorage.getItem("profilePicURL");
  const displayName = localStorage.getItem("displayName");

  useEffect(() => {
    if (localStorage.getItem("displayName") !== null) {
        setLogged(true);
    }
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();
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
            <form className="form-inline my-2 my-lg-0">
              <input id="search" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)}/>
            </form>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link">
              My Library
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <button className="btn btn-outline-success my-2 my-sm-0" style={{"color": "#1DB954"}} type="submit"><i className="fas fa-sign-out-alt"></i></button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
