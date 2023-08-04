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
const ToDoCard = ({td, 
    handleGetCurrentToDo,
    handleOpenEditDrawer,
    handleUpdateToDo}) => {
    // defined once -> needs to be defined for each todo card
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <Box key={td.id} className="card-container">
        <Grid item xs={3}>
          <div className="circle"></div>
        </Grid>
        <Grid className="card-title" item xs={true}>
          {td.title}
          <Typography>
            <span className="user-span">User: {td.userId}</span>
          </Typography>
        </Grid>
        <Grid className="elipsis-menu" item xs={3}>
          <MoreHorizIcon
            onClick={(e) => {
              handleClick(e);
              console.log("open menu", td)
            }}
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                console.log("edit todo",td)
                handleGetCurrentToDo({
                  id: td.id,
                  title: td.title,
                  userId: td.userId,
                  status: td.completed,
                });
                handleOpenEditDrawer(true);
                handleClose();
              }}
            >
              Edit ToDo {td.id}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleUpdateToDo({
                  id: td.id,
                  title: td.title,
                  userId: td.userId,
                  status: "closed",
                });
              }}
            >
              Mark Completed
            </MenuItem>
          </Menu>
        </Grid>
      </Box>
    )
  }

export default ToDoCard;