import React, { useEffect, useState } from "react";
import axios from "axios";
import { Playlist } from "./PlaylistInterface";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyGetPlaylists = () => {
  const [token, setToken] = useState<string | any>("");
  const [data, setData] = useState<Playlist>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response: any) => {
        setData(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response: any) => {
        setUser(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleGetPlaylists}>Get Playlists</button>
      {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      {user?.id}
    </>
  );
};

export default SpotifyGetPlaylists;