import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type TaskStatuses = "pending" | "completed" | "overdue" | "removed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: TaskStatuses;
}

interface TasksState {
  tasks: Task[];
  trash: Task[];
  isModalOpen?: boolean;
  editingTask?: Task | null;
}

const initialState: TasksState = {
  tasks: [],
  trash: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "status">>) => {
      const newTask = {
        id: Math.random().toString(36).substring(2, 9),
        status: "pending" as const,
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action: PayloadAction<{ id: string; updates: Partial<Omit<Task, "id" | "status">> }>) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
        if (updates.deadline && new Date(updates.deadline) < new Date() && task.status !== "completed") {
          task.status = "overdue";
        }
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [removedTask] = state.tasks.splice(index, 1);
        removedTask.status = "removed";
        state.trash.push(removedTask);
      }
    },
    restoreTask: (state, action: PayloadAction<string>) => {
      const index = state.trash.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [restoredTask] = state.trash.splice(index, 1);
        restoredTask.status = "pending";
        state.tasks.push(restoredTask);
      }
    },
    markTaskAsCompleted: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.status !== "overdue") {
        task.status = "completed";
      }
    },
    markTaskAsPending: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.status === "completed") {
        task.status = "pending";
      }
    },
    checkOverdueTasks: (state) => {
      const date = new Date();
      const formattedDateNow = date.toISOString().split("T")[0];
      const now = new Date(formattedDateNow).getTime();

      state.tasks.forEach((task) => {
        const deadlineDate = new Date(task.deadline ?? "");
        const deadLineTimestamp = deadlineDate.getTime();
        if (task.deadline && deadLineTimestamp < now && task.status !== "completed") {
          task.status = "overdue";
        } else if (deadLineTimestamp >= now) {
          task.status = "pending";
        }
      });
    },
    removeTrash: (state) => {
      state.trash = [];
    },

    openModal: (state, action: PayloadAction<Task | null>) => {
      state.isModalOpen = true;
      state.editingTask = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTask = null;
    },
  },
});

export const {
  addTask,
  editTask,
  removeTask,
  restoreTask,
  markTaskAsCompleted,
  checkOverdueTasks,
  markTaskAsPending,
  removeTrash,
  openModal,
  closeModal,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTrash = (state: RootState) => state.tasks.trash;

export default tasksSlice.reducer;
