import { useState, useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import AppContext from "../context/AppContext";
import io from "socket.io-client";
import server from "../config";
import { useRouter } from "next/router";
import {fetchAllCohortData,fetchAllUserData } from '../utility'
const socket = io.connect(`${server}`);

export default function Login() {
  const { login, userData, setUserData, invokeSetLogin } =
    useContext(LoginContext);
  const {
    allUsersData,
    allCohortsData,
    invokeSetAllUsersData,
    invokeSetAllCohortsData,
    loading,
    setLoading,
  } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetchAllCohortData(invokeSetAllUsersData,setLoading);
      await fetchAllUserData(invokeSetAllCohortsData);

      if (!login) {
        router.push("/login");
        return
      }else if(userData){
        console.log(userData);
        
      }

      // login && userData.admin
      //   ? console.log('adminPage')
      //    //router.push("/admin")
      //   : console.log('studentPage')//router.push("/student");
    })();
  }, [invokeSetLogin, login]);

 

  return <div></div>;
}
