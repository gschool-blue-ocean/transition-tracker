import React from "react";
import AdminNav from "./components/AdminNav";
import StudentNav from "./components/StudentNav";
import style from "../../style/SideNav.module.css";

export default function SideNav({ viewClickedCohort, activeStudent, setActiveStudent }) {
   return (
      <div className={style.sideNav-Wrapper}>
         <AdminNav viewClickedCohort={viewClickedCohort} activeStudent={activeStudent} setActiveStudent={setActiveStudent} />
      </div>
   );
}
