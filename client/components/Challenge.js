import React from "react";
import { connect } from "react-redux";
import { addChallengeLine, removeChallengeLine } from "../store/challengeLines";
import { deleteChallenge } from "../store/challenges";

const Challenge = ({
  specificChallenge,
  challenge,
  addChallengeLine,
  auth,
  removeChallengeLine,
  deleteChallenge
}) => {
  let existingLine = specificChallenge.find((line) => line.user.id == auth.id);

  return (
    <div>
      {challenge?.name}
      <br></br>
      Start Date: {challenge?.startDate}
      <br></br>
      End Date: {challenge?.endDate}
      <br></br>
      Difficulty: {challenge?.difficulty}
      challenge participants
      {specificChallenge.map((line) => {
        return (
          <li key={line.id}>
            {line.user.username} {line.user.points}
          </li>
        );
      })}
      <button onClick={() => addChallengeLine(challenge)}>
        Join Challenge!
      </button>
      <button onClick={() => removeChallengeLine(existingLine)}>
        Unfollow Challenge!
      </button>
      {auth.admin ? (
        <button onClick={() => {specificChallenge.map((line) => removeChallengeLine(line)); deleteChallenge(challenge)}}>
          Delete Challenge
      </button>) : ("")}
    </div>
  );
};

//add information regarding users taking the challenge
const mapState = ({ challengeLines, challenges, auth }, { match }) => {
  const specificChallenge = challengeLines?.filter(
    (challengeLine) => challengeLine.challengeId == match.params.id
  );
  const challenge = challenges.find(
    (challenge) => challenge.id == match.params.id
  );
  return {
    specificChallenge,
    challenge,
    match,
    auth,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    addChallengeLine: (newLine) => 
      dispatch(addChallengeLine(newLine)),
    removeChallengeLine: (challengeLine) =>
      dispatch(removeChallengeLine(challengeLine)),
    deleteChallenge: (challenge) => {
      dispatch(deleteChallenge(challenge, history))
    }
  };
};

export default connect(mapState, mapDispatch)(Challenge);
