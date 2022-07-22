import React from "react";

export default function SPTaskModal() {
   return (
      <div className="SPTask--Modal">
         <h3 id="Modal--Header">Task Modal</h3>

         <div className="Modal--TaskDesc">
            <p>07/12/22</p>
            <h4>Description</h4>
            <p>Task Description</p>
         </div>

         <div className="Modal--SubTasks">
            <h4>Sub Tasks</h4>
            <p>This is a subtask</p>
            <p>This is a subtask</p>
            <p>This is a subtask</p>
            <p>This is a subtask</p>
         </div>

         <div className="Modal--Remarks">
            <h4>Remarks</h4>
            <p>@Admin: Great job!</p>
            <p>@Student: Thank you!</p>
         </div>

         <form>
            <textarea placeholder="Add Remarks"></textarea>
         </form>
      </div>
   );
}
