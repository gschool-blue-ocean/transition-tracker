import React from "react";
import AdminNav from "./AdminNav";
import StudentNav from "./StudentNav";
import style from '../../styles/SideNav.module.css'


export default function SideNav({ viewClickedCohort, activeStudent, setActiveStudent }) {
   return (
      <div className={style.sideNav-Wrapper}>
         <AdminNav viewClickedCohort={viewClickedCohort} activeStudent={activeStudent} setActiveStudent={setActiveStudent} />
      </div>
   );
}
