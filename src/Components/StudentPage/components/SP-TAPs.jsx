import React from "react";

export default function SPTAPs() {
   return (
      <div className="tap-dropdown--container">
         <label>TAP: </label>
         <select>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
            <option value="Completed">Completed</option>
         </select>
      </div>
   );
}
