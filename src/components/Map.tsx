import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngBoundsExpression, LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

interface IMap {
  mapLocation: {
    lat: string;
    lng: string;
  };
}
function Map({ mapLocation }: IMap) {
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
  );
}

export default Map;
