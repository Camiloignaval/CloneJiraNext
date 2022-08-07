import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleSideBar } from "../../slices/UISlice";

export const Sidebar: FC = () => {
  const { sideBarIsOpen } = useSelector((state: RootState) => state.UI);
  const dispatch = useDispatch();

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => dispatch(toggleSideBar())}
      onKeyDown={() => dispatch(toggleSideBar())}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment>
        <Drawer
          anchor={"left"}
          open={sideBarIsOpen}
          onClose={() => dispatch(toggleSideBar())}
        >
          {list()}
        </Drawer>
      </Fragment>
    </div>
  );
};
