import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { CgEnter } from "react-icons/cg";
import AppContext from "../context/AppContext";
import LoginContext from "../context/LoginContext";
import server from "../config";

import style from "../styles/LoginStyles.module.css";
import { useRouter } from "next/router";

export default function Login({ invokeSetLogin }) {
  const router = useRouter();
  const {pathname} = router
  const { allUsersData, setLoading } = useContext(AppContext);
  const { userData, setUserData } = useContext(LoginContext);

  const [portal, setPortal] = useState(null);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setPortal(document.getElementById("portal"));
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser !== null) {
      setUserData(JSON.parse(currentUser));
      invokeSetLogin(true);
    }
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
      const loginError =
        typeof document !== "undefined" &&
        document.getElementById("blankLoginErrMsg");

      return loginError.classList.add("show");
    }

    let foundUsername = checkUsernames(inputData.username);

    if (!foundUsername) {
      setLoading(false);
      const userError =
        typeof document !== "undefined" &&
        document.getElementById("usernameLoginErrMsg");

      return userError.classList.add("show");
    }

    fetch(`${server}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (!data.username) {
          const passworedError =
            typeof document !== "undefined" &&
            document.getElementById("passwordLoginErrMsg");

          return passworedError.classList.add("show");
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
    let result = false;
    allUsersData.forEach((elem) => {
      if (elem.username === username) {
        result = true;
      }
    });
    return result;
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
    portal &&
    ReactDOM.createPortal(
      <div className={style.modalContainer}>
        {/* <button onClick={handleHash}>CLICK TO HASH</button> */}

        <div className={style.loginContainer}>
          <h1 className={style.loginTitle}>Hacking Transition</h1>
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Fields can not be blank!
          </span>

          <form className={style.loginForm} onSubmit={handleSubmit}>
            <input
              className={`${style.loginInputBox} ${style.username}`}
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
            <span id="usernameLoginErrMsg" className={style.errorMsg}>
              Username Not Found!
            </span>

            <input
              className={style.loginInputBox}
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <span id="passwordLoginErrMsg" className={style.errorMsg}>
              Incorrect Password!
            </span>

            <button type="submit" className={style.loginBtn}>
              LOG IN <CgEnter />{" "}
            </button>

            {/* <button
                        type='button'
                        className={`${style.loginBtn} ${style.createAccBtn}`}
                        onClick={handleShowCreateAccModal}>Create an Account</button> */}
          </form>
        </div>
      </div>,
      portal
    )
  );
}
