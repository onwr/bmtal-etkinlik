import React, { useEffect, useState, useRef } from "react";
import { db } from "../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import kapak from "../images/kapak.jpg";
import istiklalmarsi from "../videos/istiklalmars.mp4";
import battalgazi from "../videos/battalgazi.mp4";
import bilgehatun from "../videos/bilgehatun.mp4";
import dedekorkut from "../videos/dedekorkut.mp4";
import battalgazidua from "../videos/battalgazidua.mp4";
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
              : videoStatus === "battalgazidua"
              ? battalgazidua
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

        {videoStatus === "kapak" && (
          <img
            className="absolute top-0 right-0 inset-0 w-full h-full"
            src={kapak}
          />
        )}
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://seup.meb.gov.tr/wp-content/uploads/2022/10/battalgazi-mtal-2.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-800 mix-blend-multiply" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="bg-white backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8 border border-red-200">
          <div className="flex items-center justify-between gap-4">
            <img
              src="https://seeklogo.com/images/T/turkiye-cumhuriyeti-milli-egitim-bakanligi-logo-BD42593770-seeklogo.com.png"
              alt="MEB Logo"
              className="w-40 md:w-44"
            />
            <img
              src="https://bmtal-yemekhane.vercel.app/static/media/siluet.1a6d5f6126268ceefae4.png"
              alt="Okul Logo"
              className="w-48 md:w-56"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_of_100th_years_of_the_Republic_of_T%C3%BCrkiye.svg"
              alt="100. Yıl Logo"
              className="w-40 md:w-44"
            />
          </div>

          <div className="space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-wider animate-fadeIn">
                ADINI YAŞATAN OKULLAR PROJESİ
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                KAPSAMINDA HAZIRLADIĞIMIZ
              </p>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold text-red-800 py-5 animate-fadeIn">
              BATTAL GAZİ'Yİ <br /> TANIMA VE TANITMA
            </h1>

            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-wider animate-fadeIn">
              PROGRAMINA HOŞ GELDİNİZ
            </h3>
          </div>

          <div className="absolute -top-12 -left-4 w-24 h-24 border-t-4 border-l-4 border-red-500 rounded-tl-xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-red-500 rounded-br-xl" />
        </div>
      </div>
    </div>
  );
};

export default Home;
