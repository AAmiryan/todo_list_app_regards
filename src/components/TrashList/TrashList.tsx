import { RestoreFromTrash } from "@mui/icons-material";
import { Box, Chip, IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { checkOverdueTasks, restoreTask, selectTrash } from "../../redux/taskSlice";
import { statusColors } from "../../utils/constants";

import "./TrashList.css";

const rootClass = "trash-list";

export const TrashList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => selectTrash(state));

  return (
    <Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} style={{ textDecoration: task.status === "completed" ? "line-through" : "none" }}>
            <ListItemText
              primary={
                <div className={`${rootClass}__title-wrapper`}>
                  {task.title}
                  <Chip label={task.status.toUpperCase()} style={{ backgroundColor: statusColors[task.status] }} />
                </div>
              }
              secondary={task.description ? `${task.description} - ${task.deadline}` : task.deadline}
            />
            <IconButton
              edge="end"
              aria-label="complete"
              onClick={() => {
                dispatch(restoreTask(task.id));
                tasks.length && dispatch(checkOverdueTasks());
              }}
            >
              <RestoreFromTrash />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
