import React from "react";

const ProjectLibraries = () => {
  return (
    <div className="libraries content">
      <div className="row top" style={{marginBottom: "3rem"}}>
        <h1>This Website was Built with:</h1>
      </div>
      <div className="row" style={{marginTop: "0"}}>
        <div className="flex-container" style={{justifyContent: "center"}}>
          <img src="/images/React-logo.png" />
          <img src="/images/Redux-logo.png" />
        </div>
        <div className="flex-container">
          <img src="/images/Node-JS-logo.png" />
          <img src="/images/Express-JS-logo.png" />
          <img src="/images/Sequelize-logo.png" />
          <img src="/images/PostgreSQL-logo.png" />
        </div>
        <div className="flex-container" style={{justifyContent: "center"}}>
          <img src="/images/google-maps-platform-logo.png" style={{width: "30%"}} />
        </div>
        <div className="flex-container" style={{justifyContent: "center"}}>
          <img src="/images/socket-io-logo.png" style={{width: "20%"}} />
        </div>
      </div>
    </div>
  )
}

export default ProjectLibraries;