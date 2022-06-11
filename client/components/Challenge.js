import React from 'react';
import { connect } from 'react-redux';

const Challenge = ({
  challenges,
  users,
  connectors,
  match
}) => {
  return (
    <div>      
      {challenges.filter((challenge) => challenge.id === match.params.id*1)
      .map( challenge => {
        return (
          <li>{challenge.name} {challenge.id}</li>
        )})}
      {connectors.map( connector => {
        return (
          <li>{connector.userId}</li>
        )
      })}
    </div>
  )
}

//add information regarding users taking the challenge


export default connect(state=> state)(Challenge)


