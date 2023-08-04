import { useState } from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ToDoCard = ({
  openToDos,
  value,
  closedToDos,
  handleUpdateToDo,
  handleOpenEditDrawer,
  handleGetCurrentToDo,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Paper
        style={{
          width: "100%",
          height: 375,
          overflow: "auto",
          display: "flex",
        }}
        className="card-container"
      >
        <List>
          {value === 0
            ? openToDos?.map((x) => (
                <Box key={x.id} className="card-container">
                  <Grid item xs={3}>
                    <div className="circle"></div>
                  </Grid>
                  <Grid className="card-title" item xs={6}>
                    {x.title}
                    <Typography>
                      <span className="user-span">User: {x.userId}</span>
                    </Typography>
                  </Grid>
                  <Grid className="elipsis-menu" item xs={3}>
                    <MoreHorizIcon onClick={handleClick} />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleGetCurrentToDo({
                            id: x.id,
                            title: x.title,
                            userId: x.userId,
                            status: x.completed,
                          });
                          handleOpenEditDrawer(true);
                          handleClose();
                        }}
                      >
                        Edit ToDo
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleUpdateToDo({
                            id: x.id,
                            title: x.title,
                            userId: x.userId,
                            status: "closed",
                          });
                        }}
                      >
                        Mark Completed
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Box>
              ))
            : closedToDos?.map((x) => (
                <Box key={x.id} className="card-container">
                  <Grid item md={3}>
                    <div className="circle-complete">
                      <CheckIcon />
                    </div>
                  </Grid>
                  <Grid className="card-title" item md={6}>
                    {x.title}
                    <Typography>
                      <span className="user-span">User: {x.userId}</span>
                    </Typography>
                  </Grid>
                </Box>
              ))}
        </List>
      </Paper>
    </>
  );
};

export default ToDoCard;
