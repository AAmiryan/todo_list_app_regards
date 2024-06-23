import { TaskStatuses } from "../redux/taskSlice";

export const statusColors: Record<TaskStatuses, string> = {
  completed: "#96d796",
  overdue: "pink",
  pending: "#aae4ff",
  removed: "red",
};
