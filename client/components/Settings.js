import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: false,
    };
  }

  handleClick = (ev) => {
    this.setState({
      anchorEl: ev.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { handleClick, handleClose } = this;

    return (
      <>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            color: "#551A8B",
            fontSize: "16px",
            fontFamily: "Roboto, helvetica, Arial, sans-serif",
            textTransform: "none",
          }}
        >
          <Typography sx={{ color: "#0000FF" }}>Settings</Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/Profile">Profile </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/friends">Orders </Link>
          </MenuItem>
        </Menu>
      </>
    );
  }
}
const mapState = (state) => {
  return {
    state,
  };
};

export default connect(mapState)(Settings);
