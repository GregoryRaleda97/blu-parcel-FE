import React, { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authLogout } from "../../actions";
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core/";
import {
  AdminNavWrapper,
  LeftWrapper,
  Navigation,
  RightWrapper,
  StyledToolbar,
} from "./adminAppBarComp";
import Logo from '../../asset/img/logo.png';

const AdminAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authLogout())
    handleMenuClose()
    history.push("/");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <AccountBoxIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <LeftWrapper>
            <div>
              <img
                className='logoImg'
                src={Logo}
                style={{
                  flex: '1',
                  width: '5%',
                  marginRight: '100px',
                  position: 'absolute',
                  top: '15px',
                  left: '30px',
                  borderRadius: '4px',
                }}
                alt=''
              />
            </div>
            <Typography variant="h6" noWrap component="div" style={{position:'relative', left:'100px'}}>
              Admin
            </Typography>
          </LeftWrapper>
          <AdminNavWrapper>
            <Navigation activeStyle={{ fontWeight: "bold", color: "#0c87fa" }} to="/product-management">
              <Typography>Product Management</Typography>
            </Navigation>
            <Navigation activeStyle={{ fontWeight: "bold", color: "#0c87fa" }} to="/transaction-management">
              <Typography>Transaction Management</Typography>
            </Navigation>
            <Navigation activeStyle={{ fontWeight: "bold", color: "#0c87fa" }} to="/sales-report">
              <Typography>Sales Report</Typography>
            </Navigation>
          </AdminNavWrapper>
          <RightWrapper>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </RightWrapper>
        </StyledToolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default AdminAppBar;