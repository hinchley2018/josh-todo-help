import { useState } from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import ToDoCard from "./ToDoCard";

//TODO List
const ToDoList = ({
  openToDos,
  value,
  closedToDos,
  handleUpdateToDo,
  handleOpenEditDrawer,
  handleGetCurrentToDo,
}) => {
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
            ? openToDos?.map((td) => (
              <ToDoCard 
                td={td}
                key={td.id}
                handleGetCurrentToDo={handleGetCurrentToDo}
                handleOpenEditDrawer={handleOpenEditDrawer}
                handleUpdateToDo={handleUpdateToDo}
              />
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

export default ToDoList;


