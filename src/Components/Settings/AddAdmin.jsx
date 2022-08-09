import {React, useState} from 'react';
import FormInputs from './AddAdminFormInputs'


export const AddAdmin = () => {
  const [newAdmin, setNewAdmin] = useState({
    first: "",
    last: "",
    username: "",
    password: ""
  })

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
    }
  ];

  const handleChange =(e) => {
    setNewAdmin({...newAdmin, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(newAdmin))
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