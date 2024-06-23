import { TaskStatuses } from "../redux/taskSlice";

export const detectTodoStatus = (status: TaskStatuses): Record<TaskStatuses, boolean> => ({
  completed: status === "completed",
  overdue: status === "overdue",
  pending: status === "pending",
  removed: status === "removed",
});
