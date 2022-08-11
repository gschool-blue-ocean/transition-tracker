import React from "react";
import { useForm } from "react-hook-form";

export default function SPEditTask({ task, cancelEdit, closeModal }) {
   const { register, handleSubmit } = useForm();

   const editTask = (edit, task) => {
      const taskID = task.task_id;
      const editData = {
         title: edit.title,
         date: task.date,
         description: edit.description,
         completed: JSON.parse(edit.completed),
         remarks: null, // Remarks have been deleted
      };

      fetch(`https://hacking-transition.herokuapp.com/api/update/task/${taskID}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(editData),
      });
      cancelEdit(false);
      closeModal(false);
   };

   // data is the inputted information
   const onSubmit = (data) => {
      editTask(data, task);
   };

   return (
      <div className="Modal--EditTask">
         <button
            onClick={() => {
               cancelEdit(false);
               closeModal(false);
            }}
         >
            Close
         </button>
         <h3 id="Modal--Header">Editing Task</h3>
         <form className="Modal--TaskFormFlex" onSubmit={handleSubmit(onSubmit)}>
            <div className="Modal--TaskInputs">
               <label>Title</label>
               <input
                  defaultValue={task.title}
                  type="text"
                  placeholder="title"
                  {...register("title", { required: true })}
               />
            </div>

            <div className="Modal--TaskInputs">
               <label>Task Completed?</label>
               <select defaultValue={task.completed} {...register("completed", { required: true })}>
                  <option value="true">true</option>
                  <option value="false">false</option>
               </select>
            </div>

            <div className="Modal--TaskInputs">
               <label>Description</label>
               <input
                  defaultValue={task.description}
                  type="text"
                  placeholder="description"
                  {...register("description", { required: true })}
               />
            </div>
            <input type="submit" value="Submit Edit" />
         </form>
      </div>
   );
}
