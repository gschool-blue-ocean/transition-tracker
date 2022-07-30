import React from "react";
import AdminNav from "./components/AdminNav";
import StudentNav from "./components/StudentNav";
import "../../StyleSheets/SideNav.css";

export default function SideNav({ viewClickedCohort }) {
   return (
      <div className="sideNav--Wrapper">
         <AdminNav viewClickedCohort={viewClickedCohort} />
      </div>
   );
}
