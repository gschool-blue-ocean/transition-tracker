/*
Index.js 
	parent function for the admin settings folder
	1. uses 1 function from another folder (context)
	2. implements AddAdmin and AdminListItems on the same page.
*/

import { React, useContext } from "react";
import AppContext from "../../context/AppContext";
import AddAdmin from "./AddAdmin";
import AdminListItems from "./AdminListItems";
import style from "../../styles/Settings.module.css";

/**
 * View All Admins
 *          Get all admins
 *
 *
 * Remove Admin
 * Create Admin
 *
 *  */

function Settings() {
  const { allUsersData } = useContext(AppContext);
  return (
    <>
      <div className={style.admin - container}>
        <div className={style.addAdmin - container}>
          <AddAdmin />
        </div>
        <div className={style.adminList - container}>
          <h1 id={style.adminList - title}>Current Admins</h1>
          {allUsersData.map((user) => {
            if (user.admin) {
              console.log(user);
              return <AdminListItems user={user} key={user.user_id} />;
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Settings;
