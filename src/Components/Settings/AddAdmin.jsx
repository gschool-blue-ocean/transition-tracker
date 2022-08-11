import {React, useState, useContext} from 'react';
import FormInputs from './AddAdminFormInputs';
import LoginContext from "../../Context/LoginContext";
import AppContext from "../../Context/AppContext";


export const AddAdmin = () => {
  const [newAdmin, setNewAdmin] = useState({
    first: "",
    last: "",
    email: "",
    username: "",
    password: ""
  })
  const { setLoading, changeSetLoading } = useContext(LoginContext);
  const { invokeSetAllUsersData } = useContext(AppContext);
  //here is the request to create and admin ======================================================
  const createAdminRequest = () => {
    fetch(
      `http://hacking-transition.herokuapp.com/api/create/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      }
    ).then(fetchAllUserData)
    .catch(console.error());
  }

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
      name:"first",
      type: "text",
      label: "First Name",
      placeholder: "First Name",
      required: true
    },
    {
      id: 2,
      name:"last",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      required: true
    },
    {
      id: 3,
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Username",
      required: true
    },
    {
      id: 4,
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Password",
      required: true
    },
    {
      id: 5,
      name: "email",
      label: "Email",
      type:"email",
      placeholder:"Email",
      required: true
    }
  ];

  const handleChange =(e) => {
    setNewAdmin({...newAdmin, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(newAdmin))
    createAdminRequest();
    setNewAdmin({
      first: "",
      last: "",
      email: "",
      username: "",
      password: ""
    })
    fetchAllUserData();
    
  }
 

  return (
    <div>
      <h3>Add an Admin</h3>
      <form>
        {inputs.map((input)=>{
          return(
            <FormInputs
            key={input.id}
            {...input}
            value={newAdmin[input.name]}
            onChange={handleChange}
             />          )
        })}
        <button onClick={handleSubmit}> Submit </button>
      </form>
    </div>
  )
}

export default AddAdmin;