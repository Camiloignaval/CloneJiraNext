import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../slices/UISlice";

export const Navbar: FC = () => {
  const dispatch = useDispatch();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon
            style={{ color: "#49c5b6" }}
            onClick={() => dispatch(toggleSideBar())}
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CloneJira
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
