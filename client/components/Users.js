import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      filterValue: "",
    };
  }
  FilterChange = (ev) => {
    this.setState({
      filterValue: ev.target.value,
    });
  };

  FilterUsers = (filterValue, Users) => {
    return Users.filter((User) =>
      User.username.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  render() {
    const { filterValue } = this.state;
    const { FilterChange, FilterUsers } = this;
    let { users } = this.props;
    const randomNum = Math.floor(Math.random() * users.length - 5);
    users = FilterUsers(filterValue, users).slice(randomNum, randomNum + 5);

    return (
      <div>
        <input
          placeholder="Search Users"
          value={filterValue}
          name="Search by username"
          onChange={FilterChange}
        />
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapState)(Users);
