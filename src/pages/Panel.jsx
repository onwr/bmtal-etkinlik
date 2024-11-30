import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { ChevronDown, ChevronUp, Play, Home, Video } from "lucide-react";

const Panel = () => {
  const [aktif, setAktif] = useState("giris");
  const [openSection, setOpenSection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "bmtal1999";

  const scenes = {
    "1. Sahne": [
      { id: "giris", title: "Kapak", icon: <Home size={20} /> },
      {
        id: "battalgazi",
        title: "Battalgazi Tanıtım",
        icon: <Video size={20} />,
      },
    ],
    "2. Sahne": [
      { id: "bilgehatun", title: "Bilge Hatun", icon: <Video size={20} /> },
    ],
    "3. Sahne": [
      {
        id: "dedekorkut",
        title: "Dede Korkut Slayt",
        icon: <Video size={20} />,
      },
    ],
    "4. Sahne": [
      {
        id: "battalgazidua",
        title: "Battalgazi Dua",
        icon: <Video size={20} />,
      },
      {
        id: "ezan",
        title: "Ezan",
        icon: <Video size={20} />,
      },
      {
        id: "ney",
        title: "Ney",
        icon: <Video size={20} />,
      },
    ],
    "5. Sahne": [
      {
        id: "kilicsahne",
        title: "Kılıç Gösterisi",
        icon: <Video size={20} />,
      },
      {
        id: "mars",
        title: "Kavga Marşı",
        icon: <Video size={20} />,
      },
      {
        id: "semahsemazen",
        title: "Semah ve Semazen",
        icon: <Video size={20} />,
      },
    ],
    "6. Sahne": [
      {
        id: "bayrak",
        title: "Bayrak Gif",
        icon: <Video size={20} />,
      },
      {
        id: "ataturk",
        title: "Ne Mutlu Türküm Diyene",
        icon: <Video size={20} />,
      },
      {
        id: "dedekorkut2",
        title: "Dede Korkut Slayt",
        icon: <Video size={20} />,
      },
    ],
  };

  const handleUpdateDurum = async (durum) => {
    const docRef = doc(db, "video", "battal1");
    try {
      await updateDoc(docRef, { durum });
      setAktif(durum);
    } catch (error) {
      console.error("Durum güncellenirken hata oluştu:", error);
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Şifre yanlış. Lütfen tekrar deneyin.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Güvenlik Şifresini Giriniz
          </h1>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full p-3 border text-center rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-8 text-center border border-gray-100">
          <img
            src="https://bmtal-yemekhane.vercel.app/static/media/siluet.1a6d5f6126268ceefae4.png"
            className="w-32 mx-auto mb-4 transition-transform hover:scale-105"
            alt="Logo"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Etkinlik Kontrol Paneli
          </h1>
          <p className="text-md text-gray-600 mb-1">
            Bilişim Teknolojileri Alanı
          </p>
          <p className="text-sm text-gray-500">&copy; Onur Kürkaya</p>
        </div>

        <div className="space-y-4">
          {Object.entries(scenes).map(([sectionName, sectionScenes]) => (
            <div
              key={sectionName}
              className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 border border-gray-100"
            >
              <button
                onClick={() => toggleSection(sectionName)}
                className="w-full shadow-xl p-4 flex items-center justify-between text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl font-semibold">{sectionName}</span>
                {openSection === sectionName ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openSection === sectionName && (
                <div className="p-4 space-y-3 bg-blue-500/10 shadow-inner">
                  {sectionScenes.map((scene) => (
                    <button
                      key={scene.id}
                      onClick={() => handleUpdateDurum(scene.id)}
                      className={`w-full p-4 rounded-lg flex items-center gap-3 transition-all shadow-sm
                        ${
                          aktif === scene.id
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {scene.icon}
                      <span className="text-lg">{scene.title}</span>
                      {aktif === scene.id && (
                        <Play size={20} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-red-700 shadow-md rounded-xl text-center border border-gray-100">
          <p className="text-white">Aktif Sahne</p>
          <p className="text-2xl font-bold text-white">
            {Object.values(scenes)
              .flat()
              .find((scene) => scene.id === aktif)?.title || "Giriş Sayfası"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Panel;
