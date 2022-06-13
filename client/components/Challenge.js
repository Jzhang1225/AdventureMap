import React from "react";
import { connect } from "react-redux";
import { addChallengeLine, removeChallengeLine } from "../store/challengeLines";



const Challenge = ({ specificChallenge, challenge, addChallengeLine, match, auth }) => {
  console.log(specificChallenge)
  console.log(match.params.id)
  let existingLine = specificChallenge.filter((line)=> line.user.id == auth.id);
  console.log('existing line', existingLine);
  return (
    <div>
      {challenge.map((challenge) => {return(<div>{challenge.name}</div>)})}
      
      challenge participants
      
      {specificChallenge.map((line) => {
        return (
          <li>
            {line.user.username}{' '}
            {line.user.points}
          </li>
        )
      })}

      <button onClick={() => addChallengeLine(challenge)}>Join Challenge!</button>
      <button onClick={() => removeChallengeLine(existingLine)}>Unfollow Challenge!</button>

    </div>
  );
};

//add information regarding users taking the challenge
const mapState = ({ challengeLines, challenges , auth}, { match }) => {
  console.log('this one', challengeLines);
  const specificChallenge = challengeLines?.filter((challengeLine) => challengeLine.challengeId == match.params.id)
  const challenge = challenges.filter((challenge) => challenge.id == match.params.id);
  return {
    specificChallenge,
    challenge, 
    match, 
    auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    addChallengeLine: (newLine) => dispatch(addChallengeLine(newLine))
  }
}

export default connect(mapState, mapDispatch)(Challenge);
