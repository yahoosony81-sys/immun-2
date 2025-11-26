"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";

// Next.js에서 동적 import로 클라이언트 사이드에서만 로드
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function LocationMap() {
  const [isClient, setIsClient] = useState(false);
  const [icon, setIcon] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    // 클라이언트 사이드에서만 Leaflet과 아이콘 로드
    Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css")
    ]).then(([LModule]) => {
      const L = LModule.default || LModule;
      const leafletIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setIcon(leafletIcon);
      setMapReady(true);
    }).catch((error) => {
      console.error("Leaflet 로드 오류:", error);
    });
  }, []);

  const address = "제주 제주시 도두항서7길 2 2층";
  const mapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
  
  // OpenStreetMap 좌표 (제주 제주시 도두항서7길 2 2층)
  const latitude = 33.4996;
  const longitude = 126.5312;

  if (!isClient || !icon || !mapReady) {
    return (
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
            위치 안내
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                면역공방
              </h3>
              <p className="text-gray-700 text-lg mb-4">{address}</p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                카카오맵에서 보기
              </a>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video w-full bg-gray-200/30 flex items-center justify-center" style={{ minHeight: "400px" }}>
                <p className="text-gray-800 font-semibold drop-shadow-md">지도를 불러오는 중...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
          위치 안내
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              면역공방
            </h3>
            <p className="text-gray-700 text-lg mb-4">{address}</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              카카오맵에서 보기
            </a>
          </div>
          
          {/* OpenStreetMap 지도 표시 */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            <div 
              ref={mapContainerRef}
              className="aspect-video w-full" 
              style={{ minHeight: "400px" }}
            >
              {mapReady && (
                <MapContainer
                  key="location-map"
                  center={[latitude, longitude]}
                  zoom={15}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                  scrollWheelZoom={true}
                >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} icon={icon}>
                  <Popup>
                    <div className="text-center">
                      <strong className="text-lg">면역공방</strong>
                      <br />
                      <span className="text-sm">{address}</span>
                      <br />
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        카카오맵에서 보기 →
                      </a>
                    </div>
                  </Popup>
                </Marker>
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
