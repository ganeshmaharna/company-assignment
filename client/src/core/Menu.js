import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900", textDecoration: "none" };
  } else {
    return { color: "#ffffff", textDecoration: "none" };
  }
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <a href="/" style={{ color: "#ffffff", textDecoration: "none" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              GANESH
            </Typography>
          </a>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link style={isActive(history, "/")} to="/">
              <IconButton aria-label="Home" color="inherit">
                {/* <HomeIcon /> */}
                <Typography noWrap>Home</Typography>
              </IconButton>
            </Link>

            <Link style={isActive(history, "/cart")} to="/cart">
              <IconButton aria-label="Cart" color="inherit">
                <Typography noWrap>Cart</Typography>
              </IconButton>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                <IconButton aria-label="Dashboard" color="inherit">
                  <Typography noWrap>Dashboard</Typography>
                </IconButton>
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                <IconButton aria-label="Dashboard" color="inherit">
                  <Typography noWrap>Dashboard</Typography>
                </IconButton>
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, "/signin")} to="/signin">
                  <IconButton aria-label="Signin" color="inherit">
                    <Typography noWrap>Signin</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, "/signup")} to="/signup">
                  <IconButton aria-label="Signup" color="inherit">
                    <Typography noWrap>Signup</Typography>
                  </IconButton>
                </Link>
              </Fragment>
            )}

            {isAuthenticated() && (
              <span
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <IconButton aria-label="Signout" color="inherit">
                  <Typography noWrap>Signout</Typography>
                </IconButton>
              </span>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default withRouter(MaterialAppBar);
