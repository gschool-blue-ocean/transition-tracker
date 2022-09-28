import React from "react";
import style from '../../styles/SideNav.module.css'


export default function StudentNav({ userData }) {
   return (
      <div className={style.sideNav}>
         <div className={style.SideNav-Header}>
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
