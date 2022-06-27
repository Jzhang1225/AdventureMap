import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateChallenge from "./CreateChallenge";
import moment from "moment";
import ChallengeImage from "./ChallengeImage";
import { HashLink } from "react-router-hash-link";

const Challenges = ({ challenges, auth, challengeLines }) => {
  const map = new google.maps.Map(document.createElement("div"));
  const service = new google.maps.places.PlacesService(map);

  return (
    <div className="challenges content">
      <div className="row top">
        <h1>Challenges</h1>
        <p>Checkout these challenges!</p>
      </div>
      <div className="row anchor-links flex-container">
        <HashLink to="/challenges#your-challenges">
          <button>Your Challenges</button>
        </HashLink>
        <HashLink to="/challenges#add-challenge">
          <button>Add a Challenge</button>
        </HashLink>
      </div>
      <div className="row">
        <h2>Explore these challenges:</h2>
        <div className="flex-grid">
          {challenges.map((challenge) => {
            const startDateString = moment(
              new Date(challenge.startDate)
            ).format("MMMM D Y");
            const endDateString = moment(new Date(challenge.endDate)).format(
              "MMMM D Y"
            );

            return (
              <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                <div className="challenge-card">
                  <ChallengeImage
                    service={service}
                    address={`${challenge.locationName} ${challenge.streetAddress}, ${challenge.city}, ${challenge.state} ${challenge.zip}`}
                  />
                  <div className="card-text">
                    {challenge.name}
                    <p>
                      {startDateString} - {endDateString}
                    </p>
                    <p>
                      {challenge.city}, {challenge.state}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="user-challenges" id="your-challenges">
        <div className="row">
          <hr />
          <h2>Your challenges:</h2>
          <div className="flex-grid">
            {challengeLines
              .filter(
                (line) => line.userId == auth.id && line.completed == false
              )
              .map((line) => {
                const startDateString = moment(
                  new Date(line.challenge.startDate)
                ).format("MMMM D Y");
                const endDateString = moment(
                  new Date(line.challenge.endDate)
                ).format("MMMM D Y");
                return (
                  <Link to={`/challenges/${line.challenge.id}`} key={line.id}>
                    <div className="challenge-card">
                      <ChallengeImage
                        service={service}
                        address={`${line.challenge.locationName} ${line.challenge.streetAddress}, ${line.challenge.city}, ${line.challenge.state} ${line.challenge.zip}`}
                      />
                      <div className="card-text">
                        {line.challenge.name}
                        <p>
                          {startDateString} - {endDateString}
                        </p>
                        <p>
                          {line.challenge.city}, {line.challenge.state}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="row" id="add-challenge">
          <div className="box">
            <h2>Add a Challenge</h2>
            <p>Don't like what you see? Create your own challenge below!</p>
            <CreateChallenge />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ challenges, challengeLines, auth }) => {
  return {
    challenges,
    auth,
    challengeLines,
  };
};

export default connect(mapState)(Challenges);
