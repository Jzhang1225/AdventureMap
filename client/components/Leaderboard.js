import * as React from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./LeaderboardRows";
import Pagination from "@mui/material/Pagination";

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      filterValue: "",
      currentPage: 1,
      usersPerPage: 10,
    };
  }

  FilterChange = (ev) => {
    this.setState({
      filterValue: ev.target.value,
      currentPage: 1,
    });
  };

  render() {
    const { currentPage, usersPerPage, filterValue } = this.state;
    const { FilterChange } = this;
    let { users, friends } = this.props;

    if (filterValue) {
      users = friends;
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <select name="filter" value={filterValue} onChange={FilterChange}>
              <option value="">All Rankings</option>
              <option value="friend"> Friend Rankings</option>
            </select>
            <Pagination
              count={Math.ceil(users.length / usersPerPage)}
              color="primary"
              page={currentPage}
              onChange={(ev, page) => this.setState({ currentPage: page })}
            />
            {!filterValue ? (
              <div>Global Rankings</div>
            ) : (
              <div>Friend Rankings</div>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ width: 1000 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Total points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUsers.map((user, idx) => (
                    <Row
                      key={user.id}
                      user={user}
                      rank={idx + 1 + (currentPage - 1) * 10}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

const mapState = ({ users, friendRequests, auth }) => {
  users.sort((a, b) => b.points - a.points);
  let friends = friendRequests
    .filter((request) => request.status === "accepted")
    .map((friendRequest) => {
      const friend = users
        .filter((user) => user.id !== auth.id)
        .find(
          (user) =>
            user.id === friendRequest.userId ||
            user.id === friendRequest.friendId
        );
      return friend;
    });
  friends = [...friends, auth].sort((a, b) => b.points - a.points);

  return {
    users,
    friends,
  };
};

export default connect(mapState)(Leaderboard);
