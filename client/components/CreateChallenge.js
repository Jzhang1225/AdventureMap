import React from 'react';
import { connect } from 'react-redux';
import { createChallenge } from '../store/challenges';

class CreateChallenge extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      points: '',
      streetAddress: '',
      city: '',
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  submitForm(ev){
    ev.preventDefault();
    this.props.createChallenge(this.state);
    this.state = {
      name: '',
      points: '',
      creator: '',
      streetAddress: '',
    }
  }
  handleChange(ev) {
    this.setState({[ev.target.name] : ev.target.value})
  }
  render() {
    const {name, points, streetAddress, city} = this.state;
    const {handleChange} = this;
    return (
      <form onSubmit = {this.submitForm}>
        <div>
          <input
            name = 'name'
            value = {name}
            placeholder = "Challenge Name"
            onChange={handleChange}>
          </input>
          <input
            name = 'points'
            type= 'number'
            value = {points}
            placeholder = "Points"
            onChange= {ev=> this.setState({points: ev.target.valueAsNumber})}>
          </input>
          <input
            name = 'streetAddress'
            value = {streetAddress}
            placeholder = "Street Address"
            onChange={handleChange}>
          </input>
          <input
            name = 'city'
            value = {city}
            placeholder = "City"
            onChange={handleChange}>
          </input>
          
          <button disabled={
            !name || !points || !streetAddress || !city
          }>Create New Challenge!</button>
        </div>
      </form>
    )
  }
}

/*

this.state = {
      name: '',
      points: '',
      creator: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      startDate: '',
      endDate: '',
      difficulty: ''
    }

const {name, points, creator, streetAddress, city, state, zipCode, startDate, endDate, difficulty} = this.state;

<select
            name = 'difficulty'
            value = {difficulty}
            onChange = {handleChange}>
            <option value=''>Difficulty</option>
            {
              Array(5).map( level => (
                <option value={level}>{level}</option>
              ))
            }
          </select>
*/

const mapDispatch = (dispatch) => {
  return {
    createChallenge: (newChallenge) => dispatch(createChallenge(newChallenge))
  }
}

export default connect(state => state, mapDispatch)(CreateChallenge)