import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const AddToDo = ({ addDrawer, handleOpenAddDrawer, handleNewToDo }) => {
  const [newToDo, setNewToDo] = useState("");
  const [newId, setNewId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const anchor = "bottom";

  const handleToDoInput = (val) => {
    setNewToDo(val.target.value);
  };

  const handleIdInput = (val) => {
    setNewId(val.target.value);
  };

  const handleFinishPress = () => {
    handleNewToDo({
      toDo: newToDo,
      toDoId: newId,
      toDoStatus: newStatus,
    });
    handleOpenAddDrawer(false);
  };

  const list = () => (
    <Box sx={{ width: "auto" }} role="presentation">
      <List>
        <ListItem>
          <input
            className="drawer-select"
            type="text"
            placeholder="New Todo"
            onChange={handleToDoInput}
          />
        </ListItem>
        <ListItem>
          <input
            type="text"
            className="drawer-select"
            placeholder="User"
            onChange={handleIdInput}
          />
        </ListItem>
        <ListItem>
          <select
            className="drawer-select"
            value={newStatus}
            label="Status"
            onChange={(e) => setNewStatus(e)}
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
            onClick={() => handleOpenAddDrawer(false)}
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
        open={addDrawer}
        PaperProps={{
          sx: { width: "44.5%" },
        }}
      >
        <div className="drawer-container">
          <div className="drawer-header">
            <Typography inline variant="body1" align="left">
              <ArrowBackIcon onClick={() => handleOpenAddDrawer(false)} />
            </Typography>
            <Typography inline variant="body1" align="right">
              <h2>Add ToDo</h2>
            </Typography>
          </div>
          {list(anchor)}
        </div>
      </Drawer>
    </div>
  );
};

export default AddToDo;
