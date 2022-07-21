import "../../StyleSheets/StudentLanding.css";

import React from "react";

export default function StudentPage() {
   return (
      <div className="StudentDash--Wrapper">
         <div className="SDash--Header">
            <h3>Anthony Wright</h3>
            <div>MCSP-12</div>
            <div>ETS'd</div>
         </div>

         <div className="SDash--Info">
            <div>
               <h4>Personal Info</h4>
               <div>Email: awright@gmail.com</div>
               <div>Branch: US Army</div>
               <div>MOS: 31B</div>
               <div>Duty Station: Fort Bliss</div>
               <div>Terminal Leave: 07/10/22</div>
               <div>ETS: 07/12/22</div>
               <div>
                  <label>TAPs: </label>
                  <select>
                     <option value="Not Started">Not Started</option>
                     <option value="In Progress">In Progress</option>
                     <option value="Completed">Completed</option>
                  </select>
               </div>

               <h4>Dependents</h4>
               <select>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
               </select>

               <h4>Education</h4>
               <div>Degree: None</div>
               <div>
                  <label>Pursuing Degree: </label>
                  <select>
                     <option value="No">No</option>
                     <option value="Yes">Yes</option>
                  </select>
               </div>

               <h4>Relocation</h4>
               <div>
                  <label>Planning to Relocation: </label>
                  <select>
                     <option value="No">No</option>
                     <option value="Yes">Yes</option>
                  </select>
               </div>
               <label>Preferred Location</label>
            </div>
         </div>

         <div className="SDash--Tasks"></div>
         <div className="SDash--Notes"></div>
      </div>
   );
}
