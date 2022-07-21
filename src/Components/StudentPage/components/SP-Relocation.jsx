import React from "react";

export default function SPRelocation() {
   return (
      <div className="relocation-dropdwon--container">
         <h4>Relocation</h4>
         <label>Planning to Relocation: </label>
         <select>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
         </select>
         <label>Preferred Location</label>
      </div>
   );
}
