import { useState, useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import AppContext from "../context/AppContext";
import io from "socket.io-client";
import server from "../config";
import { useRouter } from "next/router";

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
      await fetchAllCohortData();
      await fetchAllUserData();

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

  const fetchAllUserData = async () => {
    await fetch(`${server}/api/users`)
      .then((res) => res.json())
      .then((data) => (console.log(data, 'getAllUsers'), invokeSetAllUsersData(data)))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  const fetchAllCohortData = async () => {
    await fetch(`${server}/api/cohorts`)
      .then((res) => res.json())
      .then((data) => (console.log(data,'getAllCohorts'), invokeSetAllCohortsData(data)))
      .catch((err) => console.log(err));
  };

  return <div></div>;
}
