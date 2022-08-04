import React from "react";
import AdminNav from "./components/AdminNav";
import StudentNav from "./components/StudentNav";
import "../../StyleSheets/SideNav.css";

export default function SideNav({ viewClickedCohort, activeStudent, setActiveStudent }) {
   return (
      <div className="sideNav--Wrapper">
         <AdminNav viewClickedCohort={viewClickedCohort} activeStudent={activeStudent} setActiveStudent={setActiveStudent} />
      </div>
   );
}
