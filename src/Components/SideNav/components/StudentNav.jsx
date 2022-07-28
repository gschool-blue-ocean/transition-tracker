import React from "react";

export default function StudentNav({ userData }) {
   return (
      <div className="SideNav">
         <div className="SideNav--Header">
            <h3>{userData.name}</h3>
            <div>{userData.cohort}</div>
         </div>

         <div>Overview</div>
         <div>Tasks</div>
         <div>Messages</div>
         <div>Profile</div>
         <div>Logout</div>
      </div>
   );
}
