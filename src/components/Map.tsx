import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngBoundsExpression, LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

interface IMap {
  mapLocation: {
    lat: string;
    lng: string;
  };
  showHeader: boolean;
}
function Map({ mapLocation, showHeader = false }: IMap) {
  const bounds = [
    [41.235, 22.357],
    [44.216, 28.295],
  ];

  const mapCenter = mapLocation
    ? [parseFloat(mapLocation.lat), parseFloat(mapLocation.lng)]
    : [51.505, -0.09]; //default center

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Example URL
    iconAnchor: [19, 38], // Anchor point
    popupAnchor: [0, -30], // Position of the popup relative to the icon
  });

  return (
    <>
      {showHeader && (
        <p className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
          Location on map:
        </p>
      )}
      <div className="mt-5 w-full h-full m-auto rounded-lg overflow-hidden border-2 border-black">
        <MapContainer
          center={mapCenter as LatLngExpression}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          maxBounds={bounds as LatLngBoundsExpression}
          minZoom={8}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={mapCenter as LatLngExpression}
            draggable={true}
            icon={customIcon}
          >
            <Popup>Client chose this location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
