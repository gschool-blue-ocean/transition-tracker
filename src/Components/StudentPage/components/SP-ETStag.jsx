import React, { useEffect, useState } from "react";

export default function SPETStag({ userETS }) {
   const [days2ETS, setDays2ETS] = useState(null);

   useEffect(() => {
      setDays2ETS(userETS);
   });

   const createETStag = (date) => {
      const currentDate = new Date();
      const studentETS = new Date(date);

      let DiffTime = studentETS.getTime() - currentDate.getTime();

      let DiffDays = (DiffTime / (1000 * 3600 * 24)).toFixed(0);

      if (DiffDays > 120) {
         return (
            <div className="StuHeader--ETStag" id="ETS-120">
               120 Days
            </div>
         );
      } else if (DiffDays <= 120) {
         return (
            <div className="StuHeader--ETStag" id="ETS-90">
               90 Days
            </div>
         );
      } else if (DiffDays <= 90) {
         return (
            <div className="StuHeader--ETStag" id="ETS-60">
               60 Days
            </div>
         );
      } else if (DiffDays <= 60) {
         return (
            <div className="StuHeader--ETStag" id="ETS-30">
               30 Days
            </div>
         );
      } else if (DiffDays <= 0) {
         return (
            <div className="StuHeader--ETStag" id="ETS-d">
               ETS'd
            </div>
         );
      }
   };

   if (!days2ETS) {
      return <div>Loading...</div>;
   } else {
      return <div className="StuHeader--ETStag">{createETStag(days2ETS)}</div>;
   }
}
