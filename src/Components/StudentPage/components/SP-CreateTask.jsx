import React from "react";
import { useForm } from "react-hook-form";

export default function SPCreateTask({ closeModal, cancelCreate }) {
   const { register, handleSubmit } = useForm();

   const onSubmit = (data) => console.log(data);

   // const addTask = (createdTask) => {
   //    fetch(`https://hacking-transition.herokuapp.com/api/create/task`, {
   //       method: "POST",
   //       headers: { "Content-Type": "application/json" },
   //       body: JSON.stringify(createdTask),
   //    });
   // };

   return (
      <div className="Modal--CreateTask">
         <button
            onClick={() => {
               cancelCreate(false);
               closeModal(false);
            }}
         >
            Close
         </button>
         <h3 id="Modal--Header">Creating Task</h3>
         <form className="Modal--TaskFormFlex" onSubmit={handleSubmit(onSubmit)}>
            <div className="Modal--TaskInputs">
               <label>Title</label>
               <input type="text" {...register("title", { required: true })} />
            </div>

            <div className="Modal--TaskInputs">
               <label>Date (MM/DD/YYYY)</label>
               <input type="text" {...register("date", { required: true })} />
            </div>

            <div className="Modal--TaskInputs">
               <label>Description</label>
               <input type="text" {...register("description", { required: true })} />
            </div>

            <div className="Modal--TaskInputs">
               <label>Is this task completed?</label>
               <select defaultValue="false" {...register("completed", { required: true })}>
                  <option value="true">true</option>
                  <option value="false">false</option>
               </select>
            </div>

            <input type="submit" value="Create Task" />
         </form>
      </div>
   );
}
