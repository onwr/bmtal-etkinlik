import React, { useEffect, useState, useRef } from "react";
import { db } from "../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import kapak from "../images/kapak.jpg";
import istiklalmarsi from "../videos/istiklalmars.mp3";
import battalgazi from "../videos/battalgazi.mp4";
import bilgehatun from "../videos/bilgehatun.mp4";
import dedekorkut from "../videos/dedekorkut.mp4";
import ezan from "../videos/ezan.mp4";
import camii from "../images/cami.jpg";
import ney from "../videos/ney.mp4";
import kilicsahne from "../videos/kilicsahnesi.mp4";
import mars from "../videos/mars.mp3";
import marsslayt from "../videos/slayt.mp4";
import semah from "../videos/semah.mp3";
import semahslayt from "../videos/slayt2.mp4";
import ataturk from "../videos/ataturk.mp4";
import bayrak from "../videos/bayrak.mp4";
import battalgazisessiz from "../videos/sessizslayt.mp4";

const Home = () => {
  const [videoStatus, setVideoStatus] = useState("giris");
  const [audioLevels, setAudioLevels] = useState({});
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const audioRef2 = useRef(null);

  useEffect(() => {
    const audioDocRef = doc(db, "video", "battal2");
    const unsubscribeAudio = onSnapshot(audioDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setAudioLevels(docSnapshot.data());
      }
    });
    return () => unsubscribeAudio();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "video", "battal1");
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setVideoStatus(data.durum);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (videoRef.current && audioLevels[videoStatus] !== undefined) {
      videoRef.current.volume = audioLevels[videoStatus] / 100;
    }
  }, [videoStatus, audioLevels]);

  if (videoStatus !== "giris") {
    return (
      <div className="min-h-screen">
        <video
          ref={videoRef}
          src={
            videoStatus === "battalgazi"
              ? battalgazi
              : videoStatus === "istiklalmarsi"
              ? istiklalmarsi
              : videoStatus === "bilgehatun"
              ? bilgehatun
              : videoStatus === "dedekorkut"
              ? dedekorkut
              : videoStatus === "battalgazisessiz"
              ? battalgazisessiz
              : videoStatus === "ezan"
              ? ezan
              : videoStatus === "ney"
              ? ney
              : videoStatus === "kilicsahne"
              ? kilicsahne
              : videoStatus === "mars"
              ? marsslayt
              : videoStatus === "semahsemazen"
              ? semahslayt
              : videoStatus === "ataturk"
              ? ataturk
              : videoStatus === "dedekorkut2"
              ? dedekorkut
              : videoStatus === "bayrak"
              ? bayrak
              : null
          }
          autoPlay
          className="w-full h-screen object-cover"
        >
          Your browser does not support the video tag.
        </video>

        {videoStatus === "ezan" && (
          <img
            className="absolute top-0 right-0 inset-0 w-full h-full"
            src={camii}
          />
        )}
        {videoStatus === "mars" && (
          <audio ref={audioRef} src={mars} autoPlay={true} loop />
        )}
        {videoStatus === "semahsemazen" && (
          <audio ref={audioRef2} src={semah} autoPlay={true} loop />
        )}
      </div>
    );
  }

  return (
    <img className="absolute top-0 right-0 inset-0 w-full h-full" src={kapak} />
  );
};

export default Home;
