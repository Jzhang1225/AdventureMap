import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateChallenge from "./CreateChallenge";

const Challenges = ({ challenges, auth, challengeLines }) => {
  console.log("user specific challenges:", challengeLines);
  return (
    <div>
      Your challenges:
      {challengeLines
        .filter((line) => line.userId == auth.id)
        .map((line) => {
          return (
            <li key={line.id}>
              <Link to={`/challenges/${line.challenge.id}`}>
                {line.challenge.name}
              </Link>
            </li>
          );
        })}
      <br></br>
      Explore other challenges:
      {challenges.map((challenge) => {
        return (
          <div key={challenge.id}>
            <Link to={`/challenges/${challenge.id}`}>{challenge.name}</Link>
          </div>
        );
      })}
      {/*limit how much is seen.*/}
      Don't like what you see? Create your own challenge below!
      <CreateChallenge />
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
