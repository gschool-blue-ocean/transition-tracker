import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { CgEnter } from "react-icons/cg";
import AppContext from "../context/AppContext";
import LoginContext from "../context/LoginContext";
import server from "../config";

import style from "../styles/LoginStyles.module.css";
import { useRouter } from "next/router";
import { fetchAllCohortData, fetchAllUserData } from "../utility";

export default function Login({ invokeSetLogin }) {
  const router = useRouter();
  const {
    allUsersData,
    invokeSetAllUsersData,
    invokeSetAllCohortsData,
    setLoading,
  } = useContext(AppContext);
  const { userData, setUserData } = useContext(LoginContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    userName: false,
    blank: false,
  });

  useEffect(() => {
    (async () => {
      await fetchAllCohortData(invokeSetAllCohortsData);
      await fetchAllUserData(invokeSetAllUsersData, setLoading);
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser !== null) {
        setUserData(JSON.parse(currentUser));
        invokeSetLogin(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (userData) {
      invokeSetLogin(true);
      userData.admin ? router.push("/admin") : router.push("/student");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    removeErrorMsgs();
    handleLogin();
  };

  const removeErrorMsgs = () => {
    const errorMsg =
      typeof document !== "undefined" && document.querySelectorAll(".errorMsg");

    errorMsg.forEach((elem) => elem.classList.remove("show"));
  };

  const handleLogin = () => {
    setLoading(true);

    let inputData = {
      username: loginData.username,
      password: loginData.password,
    };

    if (inputData.username.length === 0 || inputData.password.length === 0) {
      setLoading(false);
      setErrors((oldErrors) => ({ ...oldErrors, blank: true }));
    }

    let foundUsername = checkUsernames(inputData.username);

    if (!foundUsername) {
      setLoading(false);
      setErrors((oldErrors) => ({ ...oldErrors, userName: true }));
    }

    fetch(`${server}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);

        if (!data.username) {
          setErrors((oldErrors) => ({ ...oldErrors, password: true }));
        } else if (data.new_user) {
          setUserData(data);
          router.push("/create-account");
        } else {
          setUserData(data);
          invokeSetLogin(true);
          localStorage.setItem("currentUser", JSON.stringify(data));
        }
      });
  };

  const checkUsernames = (username) => {
    for (user of allUsersData) {
      return user.username === username
    }

  };

  const handleChange = (e) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // const handleHash = () => {
  //     allUsersData.forEach(elem => {
  //         let data = {
  //             username: elem.username,
  //             password: elem.password
  //         }

  //         fetch(`${server}/api/hash`, {
  //             method: 'PATCH',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(data)
  //         })
  //             .then(res => res.json())
  //             .then(data => console.log(data))
  //             .catch(err => console.warn(err))
  //     })
  // }

  return (
    <div className={style.modalContainer}>
      {/* <button onClick={handleHash}>CLICK TO HASH</button> */}

      <div className={style.loginContainer}>
        <h1 className={style.loginTitle}>Hacking Transition</h1>
        {errors.blank && (
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Fields can not be blank!
          </span>
        )}

        <form className={style.loginForm} onSubmit={handleSubmit}>
          <input
            className={`${style.loginInputBox} ${style.username}`}
            type="text"
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
          {errors.userName && (
            <span id="usernameLoginErrMsg" className={style.errorMsg}>
              Username Not Found!
            </span>
          )}

          <input
            className={style.loginInputBox}
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span id="passwordLoginErrMsg" className={style.errorMsg}>
              Incorrect Password!
            </span>
          )}

          <button type="submit" className={style.loginBtn}>
            LOG IN <CgEnter />{" "}
          </button>

          {/* <button
                        type='button'
                        className={`${style.loginBtn} ${style.createAccBtn}`}
                        onClick={handleShowCreateAccModal}>Create an Account</button> */}
        </form>
      </div>
    </div>
  );
}
