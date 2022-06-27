import React from "react";

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

class ChallengeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.getGooglePhoto();
  }

  getGooglePhoto = () => {
    const { service, address } = this.props;
    let photoUrl = "test";
    try {
      const request = {
        query: address,
        fields: ["name", "photos", "place_id"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          if (results[0].photos) {
            photoUrl = results[0].photos[0].getUrl();
          } else {
            photoUrl = "/images/placeholder.jpg";
          }
          this.setState({ imageUrl: photoUrl });
          this.setState({ loading: false });
        } else {
          photoUrl = "/images/placeholder.jpg";
          this.setState({ imageUrl: photoUrl });
          this.setState({ loading: false });
        }
        if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
          sleep(2000);
          this.setState({ loading: true });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return this.state.loading ? (
      <img src={"/images/placeholder.jpg"} alt="image" />
    ) : (
      <img src={this.state.imageUrl} alt="image" />
    );
  }
}

export default ChallengeImage;
