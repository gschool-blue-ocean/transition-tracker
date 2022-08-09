import React from "react";

export default function SPTasks({ openModal }) {
   // Pull All Tasks from DB for Selected User
   return (
      <div className="SDash--Tasks">
         <h4 id="StuTasks--Header">Tasks</h4>
         <div className="StuTasks--Card" onClick={openModal}>
            Task
         </div>
         <div className="StuTasks--Card" onClick={openModal}>
            Task
         </div>
         <div className="StuTasks--Card" onClick={openModal}>
            Task
         </div>
         <div className="StuTasks--Card" onClick={openModal}>
            Task
         </div>
         <div className="StuTasks--Card" onClick={openModal}>
            Task
         </div>
         <div className="StuTasks--Card" onClick={openModal}>
            Task
         </div>
      </div>
   );
}
