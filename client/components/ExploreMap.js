import React, { useState, useMemo, useEffect, useRef, ReactElement } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function ExploreMap() {
  const { isLoaded } = useLoadScript({
    //googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyAgapdAdTGAIeABcvZT0NBodGTLSQxzvJM",
  })

  if (!isLoaded) return <h3>Loading...</h3>;
  return (
    <div>
      <h1>Explore Map:</h1>
      <GoogleMap
        zoom={10}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={{ lat: 40.7616731, lng: -73.8155219 }}>
      </GoogleMap>
    </div>
  );
}
