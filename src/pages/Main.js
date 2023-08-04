import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchBar from "../components/SearchBar";
import "./main.css";
import EditToDo from "../components/EditToDo";
import AddToDo from "../components/AddToDo";
import Typography from "@mui/material/Typography";
import ToDoCard from "../components/ToDoCard";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    left: theme.spacing(50),
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Main = ({ userData, handleNewToDo, handleUpdateToDo }) => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [editDrawer, setEditDrawer] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [editToDo, setEditToDo] = useState({});

  const handleGetCurrentToDo = ({ id, title, userId, status }) => {
    setEditToDo({
      id: id,
      title: title,
      userId: userId,
      status: status === true ? "closed" : "open",
    });
  };
  const classes = useStyles();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenEditDrawer = (e) => {
    setEditDrawer(e);
  };

  const handleOpenAddDrawer = (e) => {
    setAddDrawer(e);
  };

  const handleEditStatus = (status) => {
    setEditStatus(status);
  };

  const openToDos =
    searchInput.length > 0
      ? userData.filter((todo) => {
          return todo.title.match(searchInput);
        })
      : userData?.filter((x) => x.completed === true);
  const closedToDos =
    searchInput.length > 0
      ? userData.filter((todo) => {
          return todo.title.match(searchInput);
        })
      : userData?.filter((x) => x.completed === false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 700,
          },
        }}
      >
        <Paper elevation={3}>
          <Typography
            className="headline-one"
            inline
            variant="body1"
            align="left"
          >
            <h2>ToDo's</h2>
          </Typography>
          <Typography
            className="headline-two"
            inline
            variant="body1"
            align="right"
          >
            <MoreHorizIcon />
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Open" {...a11yProps(0)} />
                <Tab label="Closed" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <SearchBar {...{ handleSearch, searchInput }} />

            <CustomTabPanel value={value} index={0}>
              <ToDoCard
                {...{
                  handleUpdateToDo,
                  openToDos,
                  value,
                  handleOpenEditDrawer,
                  handleGetCurrentToDo,
                }}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ToDoCard {...{ closedToDos, value }} />
            </CustomTabPanel>
          </Box>
          <div>
            <Fab className={classes.fab} color="primary" aria-label="add">
              <AddIcon onClick={() => handleOpenAddDrawer(true)} />
            </Fab>
            <EditToDo
              {...{
                handleUpdateToDo,
                editDrawer,
                handleOpenEditDrawer,
                editStatus,
                userData,
                handleEditStatus,
                handleNewToDo,
                editToDo,
              }}
            />
            <AddToDo
              {...{
                addDrawer,
                handleOpenAddDrawer,
                editStatus,
                handleNewToDo,
              }}
            />
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default Main;
