/*
AddAdmin component notes:
	function that creates a new admin, you must be logged in as an admin.
    1. Uses 2 functions from 2 other components (context folder)
    2. Creating an admin takes 5 parameters (first, last, email, username, password) strings
    3. POST requests are made to the heroku api rather than locally
    4. The FormInputs function was put at the bottom of the page to reduce component count.
    5. FormInputs takes in the inputs (array of objects) with the values to properly fill out an input form
*/

import { React, useState, useContext } from "react";
import LoginContext from "../../context/LoginContext";
import AppContext from "../../context/AppContext";
import style from "../../styles/Settings.module.css";

export const AddAdmin = () => {
  const [newAdmin, setNewAdmin] = useState({
    first: "",
    last: "",
    email: "",
    username: "",
    password: "",
  });
  const { setLoading, changeSetLoading } = useContext(LoginContext);
  const { invokeSetAllUsersData } = useContext(AppContext);
  //here is the request to create and admin ======================================================
  const createAdminRequest = () => {
    fetch(`http://hacking-transition.herokuapp.com/api/create/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdmin),
    })
      .then(fetchAllUserData)
      .catch(console.error());
  };

  const fetchAllUserData = () => {
    //changeSetLoading(true);
    fetch("https://hacking-transition.herokuapp.com/api/users")
      .then((res) => res.json())
      .then((data) => invokeSetAllUsersData(data))
      .catch((err) => console.log(err));
  };
  const inputs = [
    {
      id: 1,
      name: "first",
      type: "text",
      label: "First Name",
      placeholder: "First Name",
      required: true,
    },
    {
      id: 2,
      name: "last",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      required: true,
    },
    {
      id: 3,
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Username",
      required: true,
    },
    {
      id: 4,
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Password",
      required: true,
    },
    {
      id: 5,
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(newAdmin));
    createAdminRequest();
    setNewAdmin({
      first: "",
      last: "",
      email: "",
      username: "",
      password: "",
    });
    fetchAllUserData();
  };

  return (
    <div className={style.addAdminForm - container}>
      <form className={style.addAdmin - form}>
        <h1 id={style.addAdmin - title}>Add an Admin</h1>
        {inputs.map((input) => {
          return (
            <FormInputs
              key={input.id}
              {...input}
              value={newAdmin[input.name]}
              onChange={handleChange}
            />
          );
        })}
        <div className={style.adminFormBtn - container}>
          <button onClick={handleSubmit}> Add </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;

const FormInputs = (props) => {
  const { label, onChange, ...rest } = props;
  return (
    <div className={style.adminFormInputs - container}>
      <label>{label}</label>
      <input type="text" {...rest} onChange={onChange} />
    </div>
  );
};
