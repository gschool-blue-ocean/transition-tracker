import '../../StyleSheets/StudentLanding.css'

import React from "react";

export default function StudentPage({ setUserData, userData, invokeSetLogin }) {
   const handleClick = () => {
      localStorage.clear()
      setUserData(null)
      invokeSetLogin(false)
   }
   const styles = {
      color: "red",
      cursor: "pointer"
   }
   return <>
      <button onClick={handleClick} style={styles}>Logout</button>
      {userData.admin ? <h1>Admin view</h1> : <h1>Student view</h1>}
   </>
}
