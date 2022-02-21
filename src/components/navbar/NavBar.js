import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  selectIsAuth,
  selectRole,
  setAuth,
  setLogout,
} from "../../features/auth/authSlice";
import { Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getToken } from "../../app/localstorage";
import { useNavigate } from "react-router-dom";
import { themColors } from "../../app/constants";

const accMenu = [
  { item: "Account Info", path: "/account" },
  { item: "Billing", path: "/billing" },
  { item: "Logout", path: "/" },
];
const accMenuAdmin = [
  { item: "Account Info", path: "/account" },
  { item: "Logout", path: "/" },
];

export default function MenuAppBarr({ children }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector(selectIsAuth);
  const role = useSelector(selectRole);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccMenu = (item, path) => {
    if (item === "Logout") {
      dispatch(setLogout());
    }
    navigate(path);
    handleClose();
  };

  React.useEffect(() => {
    const isAuth = getToken();
    const authData = isAuth && JSON.parse(isAuth);

    if (authData) {
      dispatch(setAuth(authData));
    }
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ bgcolor: themColors.basic }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon size="large" />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => navigate("/")}
            >
              <Typography
                variant="h6"
                component="div"
                color={themColors.primary}
              >
                LOGO
              </Typography>
            </IconButton>

            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={auth && handleMenu}
              >
                <AccountCircle sx={{ height: "40px", width: "40px" }} />
              </IconButton>
              {auth && (
                <Menu
                  id="menu-appbar"
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
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {role === "admin"
                    ? accMenuAdmin.map(({ item, path }, indx) => (
                        <MenuItem
                          key={`${item}-${indx}`}
                          onClick={() => handleAccMenu(item, path)}
                        >
                          {item}
                        </MenuItem>
                      ))
                    : accMenu.map(({ item, path }, indx) => (
                        <MenuItem
                          key={`${item}-${indx}`}
                          onClick={() => handleAccMenu(item, path)}
                        >
                          {item}
                        </MenuItem>
                      ))}
                </Menu>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ marginTop: "5rem", color: themColors.basic }}>
        {children}
      </div>
    </>
  );
}
