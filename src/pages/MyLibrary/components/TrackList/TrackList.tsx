import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TrackList.css";
import { db } from "../../../../firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ITrack } from "./interfaces/ITrack";

const TrackList = () => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const username = ""+localStorage.getItem("username");

  useEffect(() => {
    const fetchTracks = async () => {
      const docRef = collection(db, "libraries", username, "tracks");
      const tracksSnap = await getDocs(docRef);

      let trackList:ITrack[] = [];
      tracksSnap.forEach((doc) => {
        const track = {
          id: doc.id,
          data: doc.data(),
        };
        trackList.push(track);
      })
      setTracks(trackList);
    };
    fetchTracks();
  }, []);

  const removeFromLibrary = async (id:any) => {
    const trackRef = doc(db, "libraries", username, "tracks", id);
    await deleteDoc(trackRef);
    setTracks(tracks.filter(item => item.id !== id));
  };

  return (
    <>
      <div className="row">
        {tracks?.map((track) => (
          <div className="col-md-3 d-flex justify-content-center mt-5" key={track?.id}>
            <div className="shadow-lg card bg-dark text-white">
              <img src={track?.data.albumImage} alt={track?.data.album} />
              <div className="card-body">
                <div className="card-text-container">
                  <p className="card-text text-center">
                    {track?.data.name}
                    <br />
                    <span onClick={e => removeFromLibrary(track?.id)}>
                      - Remove
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

export default TrackList;