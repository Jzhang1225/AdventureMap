import React from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import mapStyles from "../../src/mapStyles";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

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
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [rows, setRows] = React.useState([]);

  // Set marker where user clicks
  const onMapClick = React.useCallback((event) => {
    let marker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    };
    //console.log(marker);
    setMarkers(current => [...current, marker])
  }, []);

  const onAddButton = React.useCallback((event) => {
    
  }, []);

  // Storing map reference
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div>
      <h1>Explore Map:</h1>
      
      {/*<Autocomplete>
        <input type="text" placeholder="Enter Location" />
      </Autocomplete>*/}
      
      <GooglePlacesAutocomplete
        placeholder="Enter location"
        onSelect={result => {
          const { description, place_id } = result;
          setRows([{ description, place_id }, ...rows]);
        }}
      />
      <button onClick={onAddButton}>Add</button>

      <div
        style={{
          textAlign: "left"
        }}
      >
        {rows.map(row => (
          <div class="selected-place">
            <div>{row.description}</div>
            <small>Place id: {row.place_id}</small>
          </div>
        ))}
      </div>

      <GoogleMap
        zoom={12}
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map(marker => (
          <Marker 
            key={ marker.time.toISOString() } 
            position={ {lat: marker.lat, lng: marker.lng} } 
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow 
            position={{ lat: selected.lat, lng: selected.lng }} 
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Explore Event!</h2>
              <p>Here's some information.</p>
            </div>
          </InfoWindow>) : null}
      </GoogleMap>
    </div>
  );
}