import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewReleases.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase/config";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const NewReleases = () => {
  const [tracks, setTracks] = useState<any[]>([]);

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

  const addTrackToLibrary = (e:any, trackIndex: number) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    if (username) {
      const writeTrackToLibrary = async (track: any) => {

        const trackInfo = {
          album: track.album.name,
          name: track.name,
          albumImage: track.album.images[0].url,
          id: track.id,
        };

        await addDoc(collection(db, "libraries", username, "tracks"), trackInfo);
      }
      writeTrackToLibrary(tracks[trackIndex]);
    }
  }

  return (
    <>
      <h2>New Releases</h2>
      <div className="row mt-3">
        {tracks?.map((track, index) => (
          <div className="col-md-3 d-flex justify-content-center">
            <div className="shadow-lg card bg-dark text-white">
              <img src={track?.album.images[0].url} alt="" className="card-img-top" />
              <div className="card-body">
                <div className="card-text-container">
                  <p className="card-text text-center">
                    {track?.name}
                    <br />
                    <span onClick={e => addTrackToLibrary(e, index)}>
                      - Add to library
                    </span>  
                  </p>
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