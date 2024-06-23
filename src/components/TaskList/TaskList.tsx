import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, IconButton, Box, Chip } from "@mui/material";
import { Check, Delete, Edit, AdsClick } from "@mui/icons-material";
import { RootState } from "../../redux/store";
import {
  selectTasks,
  removeTask,
  markTaskAsCompleted,
  checkOverdueTasks,
  editTask,
  markTaskAsPending,
  openModal,
  Task,
} from "../../redux/taskSlice";

import { statusColors } from "../../utils/constants";

import "./TaskList.css";
import { TaskModal } from "../TaskModal/TaskModal";

const rootClass = "task-list";

export const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => selectTasks(state));

  useEffect(() => {
    tasks.length && dispatch(checkOverdueTasks());
  }, [dispatch, tasks.length]);

  const handleEditTask = useCallback(
    (task: Task) => {
      dispatch(openModal(task));

      dispatch(editTask({ id: task.id, updates: { ...task } }));
    },
    [dispatch]
  );

  return (
    <Box>
      <List>
        {tasks.map((task) => {
          const { status, description, title, id, deadline } = task;
          const completedStatus = status === "completed";
          
          return (
            <ListItem key={id} style={{ textDecoration: completedStatus ? "line-through" : "none" }}>
              <ListItemText
                primary={
                  <div className={`${rootClass}__title-wrapper`}>
                    {title}
                    <Chip label={status.toUpperCase()} style={{ backgroundColor: statusColors[status] }} />
                  </div>
                }
                secondary={description ? `${description} - ${deadline}` : deadline}
              />
              <IconButton
                edge="end"
                aria-label="complete"
                onClick={() => dispatch(completedStatus ? markTaskAsPending(id) : markTaskAsCompleted(id))}
                disabled={status === "overdue"}
              >
                {completedStatus ? <AdsClick /> : <Check />}
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeTask(id))}>
                <Delete />
              </IconButton>
            </ListItem>
          );
        })}
        <TaskModal />
      </List>
    </Box>
  );
};
