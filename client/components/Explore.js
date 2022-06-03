import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function Explore() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";
  return (
    <GoogleMap
      zoom={10}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
      center={{ lat: 40.7616731, lng: -73.8155219 }}
    ></GoogleMap>
  );
}
