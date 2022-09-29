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
    !login && router.push("/login");
    userData && userData.admin ? router.push("/admin") : router.push("/student");
    fetchAllCohortData();
    fetchAllUserData();
  }, [invokeSetLogin, login]);

  const fetchAllUserData = () => {
    fetch(`${server}/api/users`)
      .then((res) => res.json())
      .then((data) => invokeSetAllUsersData(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  const fetchAllCohortData = () => {
    fetch(`${server}/api/cohorts`)
      .then((res) => res.json())
      .then((data) => invokeSetAllCohortsData(data))
      .catch((err) => console.log(err));
  };

  return (
   <div></div>
  );
}
