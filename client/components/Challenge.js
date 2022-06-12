import React from "react";
import { connect } from "react-redux";

const Challenge = ({ challengeLines }) => {
  return (
    <div>
      {challengeLines.map((line) => {
        return (
          <div key={line.id}>
            user: {line.user.username}
            <br></br>
            challenge: {line.challenge.name}
          </div>
        );
      })}
    </div>
  );
};

//add information regarding users taking the challenge
const mapState = ({ challengeLines }) => {
  return {
    challengeLines,
  };
};

export default connect(mapState)(Challenge);
