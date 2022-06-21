import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import mapStyles from "../../src/mapStyles";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { createChallenge } from "../store";
import axios from "axios";

const libraries = ["places"];
const center = { lat: 40.7616731, lng: -73.8155219 };
const mapContainerStyle = { width: "90vw", height: "90vh" };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Explore({ challenges, auth, createChallenge }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // componenetDidUpdate to place the challenges markers
  useEffect(async () => {
    for (const challengeLine of challenges) {
      const challenge = challengeLine.challenge;

      const place = await getGeocode({
        address: `${challenge.streetAddress}, ${challenge.city}, ${challenge.state} ${challenge.zip}`,
      });
      if (!place) return;

      const { lat, lng } = getLatLng(place[0]);

      // const result = await axios.get(
      //   `https://maps.googleapis.com/maps/api/place/search/json?location=40.7616731,-73.8155219&radius=5000&types=museum&key=${process.env.GOOGLE_MAPS_API_KEY}`
      // );
      // console.log(result);

      let marker = {
        lat,
        lng,
        challenge,
        completed: challengeLine.completed,
        time: new Date(),
      };

      if (
        !markers.find(
          (flag) => flag.lat === marker.lat && flag.lng === marker.lng
        )
      ) {
        setMarkers((current) => {
          return [...current, marker];
        });
      }
    }
  }, [challenges.length]);

  // Set marker where user clicks
  const onMapClick = React.useCallback(async (event) => {
    let address;

    async function getReverseGeocodingData(lat, lng) {
      const latlng = new google.maps.LatLng(lat, lng);
      const geocoder = new google.maps.Geocoder();
      await geocoder.geocode({ latLng: latlng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        }
        if (status == google.maps.GeocoderStatus.OK) {
          address = results[0].formatted_address;
        }
      });
    }
    await getReverseGeocodingData(event.latLng.lat(), event.latLng.lng());

    let marker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      address,
      time: new Date(),
    };
    setName("");
    setStartDate("");
    setEndDate("");
    setDifficulty("");
    setSelected(marker);
    setMarkers((current) => [...current, marker]);
  }, []);

  // Storing map reference
  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div>
      <h1>Explore Map:</h1>

      <Search setMarkers={setMarkers} setSelected={setSelected} auth={auth} />
      {/*<Autocomplete>
        <input type="text" placeholder="Enter Location" />
      </Autocomplete>*/}

      <GoogleMap
        zoom={12}
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker, idx) =>
          marker.completed ? (
            <Marker
              key={idx}
              icon={{
                url: "https://loc8tor.co.uk/wp-content/uploads/2015/08/stencil.png",
                scaledSize: new google.maps.Size(100, 50),
              }}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ) : (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          )
        )}

        {selected && <Marker position={selected} />}

        {selected ? (
          <InfoWindow
            position={selected}
            onCloseClick={() => {
              setSelected(null);
              setName("");
              setStartDate("");
              setEndDate("");
              setDifficulty("");
            }}
          >
            {selected.challenge ? (
              <div>
                <h2>{selected.challenge.name}</h2>
                <p>{selected.challenge.difficulty} Difficulty</p>
                <p>Start: {selected.challenge.startDate.slice(0, 10)}</p>
                <p>End: {selected.challenge.endDate.slice(0, 10)}</p>
              </div>
            ) : (
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(ev) => {
                  ev.preventDefault();

                  const { address } = selected;
                  const challengeAddress = address.split(", ");

                  createChallenge({
                    name,
                    startDate,
                    endDate,
                    difficulty,
                    streetAddress: challengeAddress[0],
                    city: challengeAddress[1],
                    state: challengeAddress[2].slice(0, 2),
                  });

                  setSelected("");
                }}
              >
                <input
                  name="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  placeholder="Challenge Name"
                />
                <input
                  name="startDate"
                  value={startDate}
                  type="date"
                  onChange={(ev) => setStartDate(ev.target.value)}
                />
                <input
                  name="endDate"
                  value={endDate}
                  type="date"
                  onChange={(ev) => setEndDate(ev.target.value)}
                ></input>
                <select
                  name="difficulty"
                  value={difficulty}
                  onChange={(ev) => setDifficulty(ev.target.value)}
                >
                  <option value="">Difficulty</option>
                  <option value={"Easy"}>Easy</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"Hard"}>Hard</option>
                </select>
                <button
                  disabled={!name || !startDate || !endDate || !difficulty}
                >
                  Create Challenge
                </button>
              </form>
            )}
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

const Search = ({ setMarkers, setSelected, auth }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  // {
  // requestOptions: {
  //   location: { lat: () => center.lat, lng: () => center.lng },
  //   radius: 200 * 1000,
  // }
  // }

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);

    let marker = {
      lat,
      lng,
      time: new Date(),
      address,
    };

    setSelected(marker);
    setMarkers((current) => [...current, marker]);
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className="search-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(
                (
                  { place_id, description } // data is an array of location descriptions
                ) => <ComboboxOption key={place_id} value={description} />
              )}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

const mapState = ({ challengeLines, auth }) => {
  const challenges = challengeLines.filter(
    (challengeLine) => challengeLine.userId === auth.id
  );

  return {
    challenges,
    auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createChallenge: (newChallenge) => dispatch(createChallenge(newChallenge)),
  };
};

export default connect(mapState, mapDispatch)(Explore);
