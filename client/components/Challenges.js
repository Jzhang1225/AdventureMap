import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateChallenge from "./CreateChallenge";

const Challenges = ({ challenges, auth, challengeLines }) => {
  console.log("user specific challenges:", challengeLines);
  return (
    <div className="challenges content">
      <div className="row top">
        <h1>Challenges</h1>
        <p>Checkout these challenges!</p>
      </div>
      <div className="user-challenges">
        <div class="row">
          Your challenges:
          {challengeLines
            .filter((line) => line.userId == auth.id && line.completed == false)
            .map((line) => {
              return (
                <li key={line.id}>
                  <Link to={`/challenges/${line.challenge.id}`}>
                    {line.challenge.name}
                  </Link>
                </li>
              );
            })
          }
        </div>
        <div class="row">
          Explore other challenges:
          {challenges.map((challenge) => {
            return (
              <div key={challenge.id}>
                <Link to={`/challenges/${challenge.id}`}>{challenge.name}</Link>
              </div>
            );
          })}
        </div>
        <div class="row">
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
