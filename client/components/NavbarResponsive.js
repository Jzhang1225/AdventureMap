import * as React from "react";
import { connect } from "react-redux";
import { logout, resetFriends } from "../store";

import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Explore", "Leaderboard", "Challenges"];
const loggedInPages = ["Explore", "Leaderboard", "Challenges", "Users"];
const settings = ["Profile", "Friends", "Logout"];
const settingsUrls = [];

const NavbarResponsive = ({ handleClick, isLoggedIn, auth }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#FFFFFF", color: "#5e387c" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Repsonsive Menu Navbar */}
          <Box
            sx={{
              flexBasis: "300px",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isLoggedIn
                ? loggedInPages.map((page) => {
                    const url = "/" + page;
                    return (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link href={url}>{page}</Link>
                        </Typography>
                      </MenuItem>
                    );
                  })
                : pages.map((page) => {
                    const url = "/" + page;
                    return (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link href={url}>{page}</Link>
                        </Typography>
                      </MenuItem>
                    );
                  })}
            </Menu>
          </Box>

          {/* Main Navbar */}
          <Box sx={{ flexBasis: "300px", flexGrow: 1 }}>
            <Link href="/home">
              <img className="logo" src="/images/logo.svg" />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {isLoggedIn
              ? loggedInPages.map((page) => {
                  const url = "/" + page;
                  return (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      href={url}
                      sx={{ color: "#5e387c", display: "block" }}
                    >
                      {page}
                    </Button>
                  );
                })
              : pages.map((page) => {
                  const url = "/" + page;
                  return (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      href={url}
                      sx={{ color: "#5e387c", display: "block" }}
                    >
                      {page}
                    </Button>
                  );
                })}
          </Box>

          {/* Right Menu */}
          <Box
            sx={{
              flexBasis: "300px",
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {isLoggedIn ? (
              <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={`/public/profile-pics/${auth.avatar}`}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: "45px",
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link href="/Profile">Profile</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="Friends" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link href="/Friends">Friends</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    key="FriendsInventation"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">
                      <Link href="/FriendsInventation">Friend Inventation</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="Messenger" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link href="/Messenger">Messenger</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="Logout" onClick={handleClick}>
                    <Typography textAlign="center">
                      <Link href="/">Logout</Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Box
                sx={{
                  flexBasis: "300px",
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  key="Sign Up"
                  onClick={handleCloseNavMenu}
                  href="/signup"
                  sx={{
                    backgroundColor: "#5e387c",
                    color: "#ffffff",
                    display: "block",
                    padding: "0.5em 1.75em",
                    margin: "0 1.5rem 0 0",
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  key="Log In"
                  onClick={handleCloseNavMenu}
                  href="/login"
                  sx={{ color: "#5e387c", display: "block" }}
                >
                  Log In
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(resetFriends());
    },
  };
};

export default connect(mapState, mapDispatch)(NavbarResponsive);
