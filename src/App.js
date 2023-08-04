import { useEffect, useState } from "react";
import Main from "./pages/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#f2f2f2",
    },
    secondary: {
      main: "#00ff00",
    },
    mode: "dark",
  },
});

const App = () => {
  const [userData, setUserData] = useState();

  const getData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdateToDo = ({ id, title, status, userId }) => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: title,
        userId: userId,
        completed: status === "closed" ? true : false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(getData())
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNewToDo = ({ toDo, toDoId, toDoStatus }) => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: toDo,
        completed: toDoStatus === "closed" ? true : false,
        userId: toDoId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(getData())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <>
        <Main {...{ userData, handleNewToDo, handleUpdateToDo }} />
      </>
    </ThemeProvider>
  );
};

export default App;
