import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "@mui/material";
import { MdMenu } from "react-icons/md";
import { FaBook, FaBookReader, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { AiOutlineProfile } from "react-icons/ai";

const Sidebar = ({ isTeacher, isAdmin }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* admin */}
      {isAdmin ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VscGitPullRequestGoToChanges />
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/teacherRequest"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary={"Teacher Request"}
                />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GrAddCircle />
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/classes"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary={"All classes"}
                />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FaUser />
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/myProfile"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary="Profile"
                />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FaUsers />
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/users"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary="All Users"
                />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      ) : isTeacher ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GrAddCircle />
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/addClass"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary={"Add class"}
                />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FaBookReader />
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/myClass"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary="My class"
                />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineProfile></AiOutlineProfile>
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/myProfile"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary="Profile"
                />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FaBook></FaBook>
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/myEnrollClass"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary={"My enrolled class"}
                />
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineProfile></AiOutlineProfile>
              </ListItemIcon>
              <Link
                underline="none"
                href="/dashboard/myProfile"
              >
                <ListItemText
                  sx={{
                    color: "#073856",
                  }}
                  primary="Profile"
                />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FaHome></FaHome>
            </ListItemIcon>
            <Link
              underline="none"
              href="/"
            >
              <ListItemText
                sx={{
                  color: "#073856",
                }}
                primary={"Home"}
              />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      {["click"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{
              fontSize: 30,
              color: "#346B8D",
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MdMenu />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
