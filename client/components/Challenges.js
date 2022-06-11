import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Challenges = ({ challenges }) => {
  return (
    <div>
      challenges
      {challenges.map((challenge) => {
        return (
          <div key={challenge.id}>
            <Link to={`/challenges/${challenge.id}`}>{challenge.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

const mapState = ({ challenges }) => {
  return {
    challenges,
  };
};

export default connect(mapState)(Challenges);
