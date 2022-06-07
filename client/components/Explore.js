import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import mapStyles from "../../src/mapStyles";

const libraries = ["places"];
const center = { lat: 40.7616731, lng: -73.8155219 };
const mapContainerStyle = { width: "100vw", height: "100vh" };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Explore() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";
  return (
    <div>
      <h1>Explore Map:</h1>
      <GoogleMap
        zoom={12}
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={options}>
      </GoogleMap>
    </div>
  );
}
