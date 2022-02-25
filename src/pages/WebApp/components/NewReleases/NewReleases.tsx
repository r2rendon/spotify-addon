import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewReleases.css";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const NewReleases = () => {
  const [tracks, setTracks] = useState<any[]>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchNewReleases = async () => {
      const newReleases = await axios
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
      });

      console.log(newReleases.data.tracks);
      setTracks(newReleases.data.tracks);
      console.log(tracks);
    };
    fetchNewReleases();

  }, []);

  return (
    <>
      <h2>New Releases</h2>
      <div className="row mt-3">
        {tracks?.map((track) => (
          <div className="col-md-3 d-flex justify-content-center">
            <div className="shadow-lg card bg-dark text-white">
              <img src={track?.album.images[0].url} alt="" className="card-img-top" />
              <div className="card-body">
                <div className="card-text-container">
                  <p className="card-text text-center">{track?.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewReleases;