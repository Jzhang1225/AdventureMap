import React from "react";
//import { getGeocode, getLatLng } from "use-places-autocomplete";
//import {Client} from "@googlemaps/google-maps-services-js";

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

class ChallengeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
    };
  }

  componentDidMount() {
    this.getGooglePhoto();
  }

  getGooglePhoto = () => {
    const { service, address } = this.props;
    let photoUrl = "test";
    try {
      // const place = await getGeocode({
      //   address: this.props.address
      // });
      // if (!place) console.log("No place!");
      // console.log("place", place)
      // console.log("place_id", place[0].place_id)

      // const map = new google.maps.Map(document.createElement("div"));
      // const service = new google.maps.places.PlacesService(map);

      const request = {
        //query: "Museum of Contemporary Art Australia " + "40 George St, The Rocks NSW 2000, Australia",
        query: address,
        fields: ["name", "photos", "place_id"],
      };
      console.log("request", request);
      
          service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log("results", results);
            //for (let i = 0; i < results.length; i++) {
              if (results[0].photos) {
                photoUrl = results[0].photos[0].getUrl();
              }
              else {
                photoUrl = "/images/placeholder-square.jpg";
              }
              console.log("photoUrl", photoUrl)
              this.setState({ imageUrl: photoUrl });
            //}
          } else {
            photoUrl = "/images/placeholder-square.jpg";
            this.setState({ imageUrl: photoUrl });
          }
          if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
            console.error("Over Query Limit");
            sleep(2000);
          }
        });

      //console.log("done", photoUrl)

      // service.getDetails({
      //     placeId: place[0].place_id
      //   }, function(place, status) {
      //     if (status === google.maps.places.PlacesServiceStatus.OK) {
      //       if(place) {
      //         console.log("place", place);
      //       }
      //     }
      //   }
      // );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    //console.log("state photoUrl", photoUrl);
    return <img src={this.state.imageUrl} alt="image" />;
  }
}

export default ChallengeImage;
