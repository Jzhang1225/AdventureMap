import React from "react";
import { connect } from "react-redux";
import { addChallengeLine, removeChallengeLine, completeChallengeLine } from "../store/challengeLines";
import { deleteChallenge } from "../store/challenges";

const Challenge = ({
  specificChallenge,
  challenge,
  addChallengeLine,
  auth,
  removeChallengeLine,
  deleteChallenge, 
  completeChallengeLine
}) => {
  let existingLine = specificChallenge.find((line) => line.user.id == auth.id);
  console.log('check', specificChallenge)
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
      <button onClick={() => {completeChallengeLine(existingLine)}}>
        Mark Challenge as Complete!
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
    (challengeLine) => (challengeLine.challengeId == match.params.id && challengeLine.completed == false)
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
      dispatch(removeChallengeLine(challengeLine, history)),
    deleteChallenge: (challenge) => {
      dispatch(deleteChallenge(challenge, history))
    },
    completeChallengeLine: (challengeLine) => {
      dispatch(completeChallengeLine(challengeLine, history))
    }
  };
};

export default connect(mapState, mapDispatch)(Challenge);
