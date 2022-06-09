import React from 'react';
import { connect } from 'react-redux';
import { getChallenges } from '../store/challenges';


const Challenges = ({
    getChallenges
}) => {
    return (
        <div>
            challenges
        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        getChallenges: () => {
            dispatch(getChallenges)
        }
    }
}

export default connect(state => state, mapDispatch)(Challenges);
