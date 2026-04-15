"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// ─── Leaflet Map Component ──────────────────────────────────────────
// Shows LockerRoom Clothing location on an interactive map.
// Dynamically imports Leaflet to avoid SSR issues.

const POSITION: [number, number] = [-7.501693459443878, 112.65840963873772];

export function MapSection() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return (
      <div className="map-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#666" }}>Memuat peta...</span>
      </div>
    );
  }

  return <MapInner />;
}

function MapInner() {
  const [L, setL] = useState<any>(null);
  const [RL, setRL] = useState<any>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
    ]).then(([leaflet, reactLeaflet]) => {
      // Fix default marker icon
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      setL(leaflet.default);
      setRL(reactLeaflet);
    });
  }, []);

  if (!RL) {
    return (
      <div className="map-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#666" }}>Memuat peta...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = RL;

  const MAP_CENTER: [number, number] = [-7.501693459443878, 112.65840963873772];

  return (
    <div className="map-wrapper w-full h-full">
      <MapContainer
        center={MAP_CENTER}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={POSITION}>
          <Popup>
            <strong>LockerRoom Clothing</strong>
            <br />
            RT.006/RW.003, Beringin, Jiken,<br />
            Kec. Tulangan, Kab. Sidoarjo,<br />
            Jawa Timur 61273
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
