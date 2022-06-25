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
import ChallengeImage from "./ChallengeImage";
import moment from "moment";

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
  const map = new google.maps.Map(document.createElement("div"));
  const service = new google.maps.places.PlacesService(map);

  const startDateString = moment(new Date(challenge?.startDate)).format("MMMM D Y");
  const endDateString = moment(new Date(challenge?.endDate)).format("MMMM D Y");

  let existingLine = specificChallenge.find((line) => line.user.id == auth.id);
  return (
    <div className="challenge content">
      <div className="row top flex-container">
        <div className="column-left">
          <p>{startDateString} - {endDateString}</p>
          <h2>{challenge?.name}</h2>
          <p><span className="difficulty">Difficulty:&nbsp;{challenge?.difficulty}</span></p>
          <p className="creator">Created by {challenge?.creator}</p>
          
          
          { existingLine ? (
            <div>
                <button onClick={() => removeChallengeLine(existingLine)}>
                Leave Challenge
                </button>
                <button
                onClick={() => {
                  updatePoints(challenge);
                  completeChallengeLine(existingLine);
                }}
              >
                Mark as Complete
              </button>
            </div>
          ) : (
            <button onClick={() => addChallengeLine(challenge)}>
            Join Challenge!
            </button>
          )}
        </div>
        <div className="column-right">
          <div className="image-container">
            <ChallengeImage 
              service={service}
              address={`${challenge?.locationName} ${challenge?.streetAddress}, ${challenge?.city}, ${challenge?.state} ${challenge?.zip}`}
            />
          </div>
        </div>
      </div>

      <div className="row description">
        {auth.admin ? (
          <div>
            Admin only: 
            <button
              onClick={() => {
                specificChallenge.map((line) => removeChallengeLine(line));
                deleteChallenge(challenge);
              }}
            >
              Delete Challenge
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="flex-container">
          <div className="column-left description-text">
            <h2>Description</h2>
          </div>
          <div className="column-right">
            <h2>Current Participants</h2>
            {specificChallenge.map((line) => {
              return (
                <li key={line.id}>
                  <Link to={`/users/${line.user.id}`}>
                    <img src={`/public/profile-pics/${line.user.avatar}`} />
                    {line.user.username} ({line.user.points} points)
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>
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
