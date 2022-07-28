import React, { useContext } from "react";
import AppContext from "../../../Context/AppContext";

export default function AdminNav() {
   const { allUsersData } = useContext(AppContext);
   return (
      <div className="sideNav">
         <h3>Cohorts</h3>
         <div>List</div>
      </div>
   );
}
