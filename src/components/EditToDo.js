import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const EditToDo = ({
  editDrawer,
  handleOpenEditDrawer,
  userData,
  user,
  handleUpdateToDo,
  editToDo,
}) => {
  const [newToDo, setNewToDo] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const userIds = userData?.map((ids) => ids.userId);
  const filteredIds = [...new Set(userIds)];
  const anchor = "bottom";

  const handleUserIdSelect = (val) => {
    setSelectedUserId(val.target.value);
  };

  const handleStatusSelection = (val) => {
    setSelectedStatus(val.target.value);
  };

  const handleNewToDo = (val) => {
    setNewToDo(val.target.value);
  };

  const handleFinishPress = () => {
    console.log("send vals", {
      title: newToDo.length > 0 ? newToDo : editToDo.title,
      userId: selectedUserId,
      completed: selectedStatus === "closed" ? true : false,
      id: editToDo.id,
    });
    handleUpdateToDo({
      title: newToDo.length > 0 ? newToDo : editToDo.title,
      userId: selectedUserId,
      completed: selectedStatus === "closed" ? true : false,
      id: editToDo.id,
    });
    handleOpenEditDrawer(false);
  };

  const list = () => (
    <Box sx={{ width: "auto" }} role="presentation">
      <List>
        <ListItem>
          <input
            placeholder={editToDo.title}
            value={newToDo}
            className="drawer-select"
            type="text"
            onChange={handleNewToDo}
          ></input>
        </ListItem>
        <ListItem>
          <select
            placeholder={editToDo.userId}
            className="drawer-select"
            value={selectedUserId}
            label="User"
            onChange={handleUserIdSelect}
          >
            <option value="">User Id</option>
            {filteredIds?.map((x, idx) => (
              <option key={idx} value={x}>
                {x}
              </option>
            ))}
          </select>
        </ListItem>
        <ListItem>
          <select
            placeholder={editToDo.completed ? "closed" : "open"}
            className="drawer-select"
            value={selectedStatus}
            label="Status"
            onChange={handleStatusSelection}
          >
            <option value="">Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </ListItem>
        <ListItem>
          <button onClick={handleFinishPress} className="drawer-button">
            Finish
          </button>
        </ListItem>
        <ListItem>
          <button
            onClick={() => handleOpenEditDrawer(false)}
            className="drawer-button"
          >
            Quit
          </button>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="drawer-container">
      <Drawer
        anchor={anchor}
        open={editDrawer}
        PaperProps={{
          sx: { width: "44.5%" },
        }}
      >
        <div className="drawer-container">
          <div className="drawer-header">
            <Typography inline variant="body1" align="left">
              <ArrowBackIcon onClick={() => handleOpenEditDrawer(false)} />
            </Typography>
            <Typography inline variant="body1" align="right">
              <h2>Edit ToDo</h2>
            </Typography>
          </div>
          {list(anchor)}
        </div>
      </Drawer>
    </div>
  );
};

export default EditToDo;
