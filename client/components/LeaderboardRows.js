import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

class Row extends Component {
  constructor() {
    super();
  }
  render() {
    const { user, rank } = this.props;

    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {rank}
          </TableCell>
          <TableCell>
            <img src={`/public/profile-pics/${user.avatar}`} height="50px" />
          </TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.points}</TableCell>
        </TableRow>
      </Fragment>
    );
  }
}

const mapState = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapState)(Row);
