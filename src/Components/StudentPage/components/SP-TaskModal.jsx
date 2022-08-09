import React from "react";

// Pull  Selected Task Info from DB
export default function SPTaskModal({ task }) {
   console.log(task);

   const deleteTask = (taskID) => {
      fetch(`https://hacking-transition.herokuapp.com/api/delete/task/${taskID}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });
   };

   return (
      <div className="SPTask--Modal">
         <h3 id="Modal--Header">{task.title}</h3>

         <div className="Modal--TaskStatus">
            <h4>Status</h4>
            <p>{task.completed ? "Completed" : "In Progress"}</p>
         </div>

         <div className="Modal--TaskDesc">
            <p>{task.date}</p>
            <h4>Description</h4>
            <p>{task.description}</p>
         </div>

         <div className="Modal--Remarks">
            <h4>Remarks</h4>
            <p>{task.remarks}</p>
         </div>

         <form className="Modal--AddRemark">
            <textarea
               className="Modal--AddRemark"
               id="Modal--InputRemark"
               rows="10"
               placeholder="Add Remarks"
            ></textarea>
            <input type="submit" />
         </form>
         <button>Edit</button>
         <button
            onClick={() => {
               deleteTask(task.task_id);
            }}
         >
            Delete
         </button>
      </div>
   );
}
