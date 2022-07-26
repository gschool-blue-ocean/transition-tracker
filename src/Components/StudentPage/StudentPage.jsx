import '../../StyleSheets/StudentLanding.css'

import React from "react";

export default function StudentPage({ userData }) {
   return <>
      {userData.admin ? <h1>Admin view</h1> : <h1>Student view</h1>}
   </>
}
