import React from "react";
import { connect } from "react-redux";
import { createChallenge } from "../store/challenges";

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      points: "",
      locationName: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      startDate: "",
      endDate: "",
      difficulty: "",
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  submitForm(ev) {
    ev.preventDefault();
    this.props.createChallenge(this.state);
    this.setState({
      name: "",
      points: "",
      locationName: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      startDate: "",
      endDate: "",
      difficulty: "",
    });
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const {
      name,
      points,
      locationName,
      streetAddress,
      city,
      state,
      zip,
      startDate,
      endDate,
      difficulty,
    } = this.state;
    const { handleChange } = this;
    const range = ["Easy", "Medium", "Hard"];
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <input
            name="name"
            value={name}
            placeholder="Challenge Name"
            onChange={handleChange}
          ></input>
          <input
            name="points"
            type="number"
            value={points}
            placeholder="Points"
            onChange={(ev) =>
              this.setState({ points: ev.target.valueAsNumber })
            }
          ></input>
          <input
            name="locationName"
            value={locationName}
            placeholder="Location Name"
            onChange={handleChange}
          ></input>
          <input
            name="streetAddress"
            value={streetAddress}
            placeholder="Street Address"
            onChange={handleChange}
          ></input>
          <input
            name="city"
            value={city}
            placeholder="City"
            onChange={handleChange}
          ></input>
          <input
            name="state"
            value={state}
            placeholder="State"
            onChange={handleChange}
          ></input>
          <input
            name="startDate"
            value={startDate}
            type="date"
            placeholder="Start Date"
            onChange={(ev) => this.setState({ startDate: ev.target.value })}
          ></input>
          <input
            name="endDate"
            value={endDate}
            type="date"
            placeholder="End Date"
            onChange={(ev) => this.setState({ endDate: ev.target.value })}
          ></input>
          <input
            name="zip"
            value={zip}
            type="number"
            placeholder="Zipcode"
            onChange={(ev) => this.setState({ zip: ev.target.valueAsNumber })}
          ></input>
          <select name="difficulty" value={difficulty} onChange={handleChange}>
            <option value="">Difficulty</option>
            {range.map((level, idx) => (
              <option key={idx} value={level}>
                {level}
              </option>
            ))}
          </select>

          <button
            disabled={
              !name ||
              !points ||
              !locationName ||
              !streetAddress ||
              !city ||
              !state ||
              !difficulty
            }
          >
            Create New Challenge!
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createChallenge: (newChallenge) => dispatch(createChallenge(newChallenge)),
  };
};

const mapState = ({ auth }, props) => {
  return {
    auth,
    props,
  };
};

export default connect(mapState, mapDispatch)(CreateChallenge);
