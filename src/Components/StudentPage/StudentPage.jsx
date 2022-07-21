import React from "react";
import SPTasks from "./components/SP-Tasks";
import SPDependents from "./components/SP-Dependents";
import SPRelocation from "./components/SP-Relocation";
import SPEducation from "./components/SP-Education";
import SPTAPs from "./components/SP-TAPs";
import "../../StyleSheets/StudentLanding.css";

export default function StudentPage() {
   return (
      <div className="StudentDash--Wrapper">
         <div className="SDash--Header">
            <h3>Anthony Wright</h3>
            <p>MCSP-12</p>
            <p>ETS'd</p>
         </div>

         {/* User Data Card */}
         <div className="SDash--Info-card">
            <div className="infoCard-block1--container">
               <h4>Personal Info</h4>

               <p>Email: awright@gmail.com</p>
               <p>Branch: US Army</p>
               <p>MOS: 31B</p>
               <p>Duty Station: Fort Bliss</p>
               <p>Terminal Leave: 07/10/22</p>
               <p>ETS: 07/12/22</p>
            </div>
         </div>

         <SPTAPs />
         <SPEducation />
         <SPDependents />
         <SPRelocation />
         <SPTasks />
      </div>
   );
}
