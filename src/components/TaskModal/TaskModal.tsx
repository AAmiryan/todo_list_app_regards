import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { checkOverdueTasks, closeModal, editTask } from "../../redux/taskSlice";

export const TaskModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, editingTask } = useSelector((state: RootState) => state.tasks);

  const formik = useFormik({
    initialValues: {
      title: editingTask ? editingTask.title : "",
      description: editingTask ? editingTask.description : "",
      deadline: editingTask ? editingTask.deadline : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editingTask) {
        dispatch(editTask({ id: editingTask.id, updates: values }));
      }
      dispatch(closeModal());
      dispatch(checkOverdueTasks());
    },
  });

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onClose={() => dispatch(closeModal())}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            name="deadline"
            InputLabelProps={{ shrink: true }}
            value={formik.values.deadline}
            onChange={formik.handleChange}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                dispatch(closeModal());
                dispatch(checkOverdueTasks());
              }}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
