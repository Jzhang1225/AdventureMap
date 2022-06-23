import React from "react";
import { connect } from "react-redux";
import {
  addChallengeLine,
  removeChallengeLine,
  completeChallengeLine,
} from "../store/challengeLines";
import { deleteChallenge } from "../store/challenges";
import { updatePoints } from "../store/points";
import { Link } from "react-router-dom";

const Challenge = ({
  specificChallenge,
  challenge,
  addChallengeLine,
  auth,
  removeChallengeLine,
  deleteChallenge,
  completeChallengeLine,
  updatePoints
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
            <Link to={`/users/${line.user.id}`}>{line.user.username} {line.user.points}</Link>
          </li>
        );
      })}
      { existingLine ? (
        <div>
            <button onClick={() => removeChallengeLine(existingLine)}>
            Unfollow Challenge!
            </button>
            <button
            onClick={() => {
              updatePoints(challenge);
              completeChallengeLine(existingLine);
            }}
          >
            Mark Challenge as Complete!
          </button>
        </div>
      ) : (
        <button onClick={() => addChallengeLine(challenge)}>
        Join Challenge!
        </button>
      )}
      {auth.admin ? (
        <button
          onClick={() => {
            specificChallenge.map((line) => removeChallengeLine(line));
            deleteChallenge(challenge);
          }}
        >
          Delete Challenge
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

const mapState = ({ challengeLines, challenges, auth }, { match }) => {
  const specificChallenge = challengeLines?.filter(
    (challengeLine) =>
      challengeLine.challengeId == match.params.id &&
      challengeLine.completed == false
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
    addChallengeLine: (newLine) => dispatch(addChallengeLine(newLine)),
    removeChallengeLine: (challengeLine) =>
      dispatch(removeChallengeLine(challengeLine, history)),
    deleteChallenge: (challenge) => {
      dispatch(deleteChallenge(challenge, history));
    },
    completeChallengeLine: (challengeLine) => {
      dispatch(completeChallengeLine(challengeLine, history));
    },
    updatePoints:(points) => dispatch(updatePoints(points))
  };
};

export default connect(mapState, mapDispatch)(Challenge);
