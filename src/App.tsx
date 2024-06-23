import { RestoreFromTrashTwoTone } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { TrashList } from "./components/TrashList/TrashList";
import { removeTrash, selectTrash } from "./redux/taskSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";

import "./App.css";
const App: React.FC = () => {
  const trashTasks = useSelector((state: RootState) => selectTrash(state));
  const dispatch = useDispatch();

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        <h3>Todo List App</h3>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <TaskForm />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <h3>Todos</h3>
              <TaskList />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {!!trashTasks.length && (
            <Paper>
              <Box p={2}>
                <div className="trash-section">
                  <h3>Trash list </h3>
                  <IconButton edge="end" aria-label="complete" onClick={() => dispatch(removeTrash())}>
                    <RestoreFromTrashTwoTone />
                  </IconButton>
                </div>
              </Box>
              <TrashList />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
