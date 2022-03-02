import React, { useEffect, useState } from "react";
import axios from "axios";
import { Playlist } from "./PlaylistInterface";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyGetPlaylists = () => {
  const [token, setToken] = useState<string | any>("");
  const [data, setData] = useState<Playlist>();
  const [track, setTrack] = useState<any>();

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
      .get("https://api.spotify.com/v1/recommendations", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        params:{
          seed_genres: "pop,alternative,hip-hop,house",
          // seed_tracks: "0c6xIDDpzE81m2q797ordA",
          // seed_artists: "4NHQUGzhtTLFvgF5SZesLK,57dN52uHvrHOxijzpIgu3E",
          limit: 4,
        }
      })
      .then((response: any) => {
        setTrack(response.data.tracks[0]);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleGetPlaylists}>Get Playlists</button>
      {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      <img className="img-fluid" src={track?.album.images[0].url} alt="" />
      {track?.name}
    </>
  );
};

export default SpotifyGetPlaylists;