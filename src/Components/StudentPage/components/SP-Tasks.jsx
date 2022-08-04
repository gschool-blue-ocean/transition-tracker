import React from "react";

export default function SPTasks({ openModal }) {
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
