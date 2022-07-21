import "../../StyleSheets/StudentLanding.css";

import React from "react";

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

            <div className="infoCard--container">
               <ul>

               <h4 className="text-left">Personal Info</h4>

                  <li> 
                     <span className="title"> Email: </span>
                     <span className="answer"> awright@gmail.com </span>
                  </li>

                  <li> 
                     <span className="title"> Branch: </span>
                     <span className="answer"> Army </span>
                  </li>

                  <li> 
                     <span className="title under-line"> MOS: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li> 
                     <span className="title"> Duty Station: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li> 
                     <span className="title"> Terminal Leave: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li> 
                     <span className="title"> ETS: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li> 
                     <span className="title"> Title: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li>
                     <h4 id="depends" className="text-left">Dependents</h4>
                     <span className="title">None</span>
                  </li>

                  <li>
                     <span className="title">TAP Status: </span>
                     <span className="answer">Completed</span>
                  </li>

                  <li>
                     <h4 className="text-left">Education</h4>
                     <span className="title">Degree: Hell Naw</span>
                  </li>

                  <li>
                     <span className="title">Interest in pursing a degree</span>
                  </li>

                  <li>
                     <h4 className="text-left">Relocation</h4>
                     <span className="title">Planning to Rellocate?</span>
                     <span className="answer"> Yes</span>
                  </li>

               </ul>
            </div>  
               
         </div>
      </div>  
   );
}
