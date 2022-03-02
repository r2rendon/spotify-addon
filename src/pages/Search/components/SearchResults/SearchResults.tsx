import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./SearchResults.css";
import { GlobalContext } from "../../../../context/GlobalContext";
import { collection, doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

const SearchResults = () => {
  const [tracks, setTracks] = useState<any[]>([]);  
  const { search } = useContext(GlobalContext);

  let offset = 0;

  const millisToMinutesAndSeconds = (millis:number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${minutes}:${(+seconds < 10 ? "0" : "")}${seconds}`;
  }

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

  const fetchSearchResults = async () => {
    const token = localStorage.getItem("accessToken");

    const results = await axios
    .get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      params:{
        q: search,
        type: "track",
        limit: 10,
        offset: offset,
      }
    });
    offset++;

    setTracks(results.data.tracks.items);
    console.log(results.data.tracks.items);

    return results.data.tracks.items;
  };
  
  useEffect(() => {
    const results = fetchSearchResults();
  }, [search]);

  return (
    <>
      <ul className="list-group">
        {tracks?.map((track, index) => (
          <li className="list-group-item d-flex justify-content align-items-center" key={index}>
            <div className="list-img-container">
              <img src={track?.album.images[0].url} alt="" className="img-fluid" />
            </div>
            <span className="ml-2">
              { track?.name }
            </span>
            <span className="ml-5">
              { track?.album.name }
            </span>
            <div className="ml-auto d-flex justify-content align-items-center">
              <span className="">
                { millisToMinutesAndSeconds(track?.duration_ms) }
              </span>
              <div className="add-to-library" onClick={e => { addTrackToLibrary(e, index) }}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;