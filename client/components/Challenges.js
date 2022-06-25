import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateChallenge from "./CreateChallenge";
import moment from "moment";
import ChallengeImage from "./ChallengeImage";

const Challenges = ({ challenges, auth, challengeLines }) => {
  //console.log("user specific challenges:", challengeLines);

  return (
    <div className="challenges content">
      <div className="row top">
        <h1>Challenges</h1>
        <p>Checkout these challenges!</p>
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
                    address={`${challenge.locationName} ${challenge.streetAddress}, ${challenge.city}, ${challenge.state} ${challenge.zip}`}
                  />
                  {/* <img src={query} alt="" /> */}
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
      <div className="user-challenges">
        <div className="row">
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

        <div className="row">
          Don't like what you see? Create your own challenge below!
          <CreateChallenge />
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
