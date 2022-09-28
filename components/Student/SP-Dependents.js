import React, { useState, useEffect } from "react";
import server from "../../config";
import style from "../../styles/StudentPage.module.css";

export default function SPDependents({ student }) {
   const [dependents, setDependents] = useState([]);
   useEffect(() => {
      getDependents();
   }, [student]);

   const getDependents = () => {
      fetch(`${server}/api/dependents/sponsor/${student.user_id}`)
         .then((res) => res.json())
         .then((deps) => {
            setDependents(deps);
         });
   };

   if (student.has_dependents) {
      return dependents.map((dep) => {
         return (
            <div className={style.Dependent-Card}>
               <div>{dep.relation}</div>
               <div id={style.Dependent-Age}>{dep.age}</div>
            </div>
         );
      });
   }
}
