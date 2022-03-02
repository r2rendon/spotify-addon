import React, { useEffect, useState } from "react";
import "./Search.css";
import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists/SpotifyGetPlaylists";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import NewReleases from "./components/NewReleases/NewReleases";
import SearchResults from "./components/SearchResults/SearchResults";

const CLIENT_ID = "a6eeea3b3fd7485ba80c7bf5f98daf97"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/search";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

/* 
http://localhost:3000/Search#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
const getReturnedParamsFromSpotifyAuth = (hash: any) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater: any, currentValue: any) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const Search = () => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (window.location.hash && localStorage.getItem("displayName") === null) {
      console.log("entre");
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
        
      localStorage.clear();

      const fetchUserData = async () => {
        let response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });
        const userData = response.data;
        const currentUser = {
          displayName: userData.display_name,
          profilePicURL: userData.images[0].url,
          href: userData.href,
          username: userData.id,
        };

        await setDoc(doc(db, "users", userData.id), currentUser);
        localStorage.setItem("profilePicURL", currentUser.profilePicURL);
        localStorage.setItem("displayName", currentUser.displayName);
        localStorage.setItem("href", currentUser.href);
        localStorage.setItem("username", currentUser.username);
      };
      fetchUserData();
      
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    localStorage.clear();
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <NewReleases/>
        <br /><br />
        <SearchResults/>
      </div>
      <div className="container mt-5">
        <h1>hi</h1>
        <button onClick={handleLogin}>login to spotify</button>
      </div>
    </>
  );
};

export default Search;