import React from "react";

export default function SPEducation() {
   return (
      <div className="edu-dropdown--container">
         <h4>Education</h4>
         <p>Degree: None</p>

         <label>Pursuing Degree: </label>
         <select>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
         </select>
      </div>
   );
}
