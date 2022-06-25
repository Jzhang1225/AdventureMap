import React from "react";
//import { getGeocode, getLatLng } from "use-places-autocomplete";
//import {Client} from "@googlemaps/google-maps-services-js";

class ChallengeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ''
    }

  }

  componentDidMount() {
    this.getGooglePhoto();
  }

  getGooglePhoto = async () => {
    let photoUrl = 'test';
    try {
      // const place = await getGeocode({
      //   address: this.props.address
      // });
      // if (!place) console.log("No place!");
      // console.log("place", place)
      // console.log("place_id", place[0].place_id)

      const map = new google.maps.Map(document.createElement('div'));
      const service = new google.maps.places.PlacesService(map);

      const request = {
        //query: "Museum of Contemporary Art Australia " + "40 George St, The Rocks NSW 2000, Australia",
        query: this.props.address,
        fields: ["name", "geometry", "icon", "photos", "place_id"],
      };
    
      
      service.findPlaceFromQuery(
        request,
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              console.log("result", results[i]);
              photoUrl = results[i].photos[0].getUrl();
              console.log("photoUrl", photoUrl);
              this.setState({imageUrl: photoUrl})
            }
          }
        }
      );
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
    console.log("state photoUrl: ", photoUrl)
  }

  render() {
    //console.log("state photoUrl", photoUrl);
    return (
      <img src={this.state.imageUrl} alt="image" />
    )
  }
}

export default ChallengeImage;