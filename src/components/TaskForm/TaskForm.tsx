import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addTask } from "../../redux/taskSlice";

export const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0];
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required").min(2, "The title must be a minimum of 2 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addTask(values));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="deadline"
          name="deadline"
          label="Deadline"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formik.values.deadline}
          onChange={formik.handleChange}
          inputProps={{ min: today }}

        />
      </Box>
      <Button color="primary" variant="contained" type="submit">
        Add Task
      </Button>
    </form>
  );
};
