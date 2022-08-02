import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";
import DatePicker from "react-datepicker";

//not verifying password
function CreateAccountModal() {
  const { userData, invokeSetUserData, loading } = useContext(LoginContext);
  const [takingLeave, setTakingLeave] = useState(false);
  const [dependents, setDependents] = useState([]);
  const [haveDependents, setHaveDependents] = useState(false);
  let numbers = [];
  for (let i = 0; i < 121; i++) {
    numbers.push(i);
  }
  console.log(userData);
  const [createAccData, setCreateAccData] = useState({
    first: userData.first,
    last: userData.last,
    email: userData.email,
    username: userData.username,
    password: "",
    rank: "",
    mos: "",
    interests: "",
    branch: "",
    duty_station: "",
    taps_complete: true,
    leave_start_date: "",
    ets_date: "",
    planning_to_relocate: false,
    city: "",
    state: "",
    has_dependents: false,
    highest_education: "",
    seeking_further_education: false,
    admin: userData.admin,
    cohort_name: userData.cohort_name,
    cohort_id: userData.cohort_id,
    new_user: true,
  });

  let verifyPassword = "";
  //if statement for redirecting when not logged in
  const updateUser = () => {
    fetch(
      `http://hacking-transition.herokuapp.com/api/update/user/${userData.user_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createAccData),
      }
    ).catch(console.error());
  };
  console.log(userData);
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    invokeSetUserData({});
    localStorage.clear();
    console.log(createAccData);
    navigate("/");
    alert("Account successfuly created! Please log in");
  };

  const handleChange = (e) => {
    setCreateAccData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDepClick = () => {
    setDependents([...dependents, { age: 0, relation: "" }]);
  };
  const removeFormFields = (index) => {
    let newFormValues = [...dependents];
    console.log(dependents);
    newFormValues.splice(index, 1);
    console.log(dependents);
    setDependents(newFormValues);
  };
  const handleDepAgeChange = (index, event) => {
    let data = dependents;
    data[index].age = parseInt(event.target.value);
    setDependents(data);
  };
  const handleDepRelationChange = (index, event) => {
    let data = [...dependents];
    data[index].relation = event.target.value;
    setDependents(data);
  };

  const clearLeave = () => {
    if (!takingLeave) {
      setCreateAccData({ ...createAccData, leave_start_date: "" });
    }
  };

  useEffect(() => {
    clearLeave();
  }, [takingLeave]);

  const handleDependents = () => {
    if (!haveDependents) {
      setCreateAccData({ ...createAccData, has_dependents: false });
      setDependents([]);
    } else {
      setCreateAccData({ ...createAccData, has_dependents: true });
    }
  };

  useEffect(() => {
    handleDependents();
  }, [haveDependents]);

  return ReactDOM.createPortal(
    <div className="createModalContainer">
      <div className="createContainer">
        <h1>Welcome</h1>
        <h3>Please fill in your information below.</h3>
        <br></br>
        <h3>User credintials</h3>
        <form className="createForm" onSubmit={handleSubmit}>
          <div className="createInnerCredintials">
            <div>
              <p>User name:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="Desired Username"
                name="username"
                value={createAccData.username}
                onChange={handleChange}
              />
              <p>Email:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="email"
                value={createAccData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>New password:</p>
              <input
                className="createInputBox"
                type="password"
                placeholder="Desired Password"
                name="password"
                value={createAccData.password}
                onChange={handleChange}
              />
              <p>Verify New Password:</p>
              <input
                className="createInputBox"
                type="password"
                placeholder="Verify Password"
                name="verifyPassword"
                value={verifyPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <h3>Service info</h3>
          <div className="createInnerCredintials">
            <div>
              <p>ETS Date:</p>
              <input
                className="createInputBox"
                type="date"
                name="ets_date"
                value={createAccData.ets_date}
                onChange={(e) => {
                  setCreateAccData({
                    ...createAccData,
                    ets_date: e.target.value,
                  });
                }}
              />
              <p>Branch of service:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="branch"
                value={createAccData.branch}
                onChange={handleChange}
              />
              <p>MOS/Rate:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="mos"
                value={createAccData.mos}
                onChange={handleChange}
              />
              <p>Rank:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="rank"
                value={createAccData.rank}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Duty Station:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="duty_station"
                value={createAccData.duty_station}
                onChange={handleChange}
              />
              <p>City:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="city"
                value={createAccData.city}
                onChange={handleChange}
              />
              <p>State:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="PaceHolderText"
                name="state"
                value={createAccData.state}
                onChange={handleChange}
              />
            </div>
          </div>
          <p>Terminal Leave:</p>
          <div>Will you be taking terminal leave?</div>
          <input
            className="terminal-leave-checkbox"
            type="checkbox"
            placeholder="date"
            name="leave_start_date"
            value={takingLeave}
            onChange={() => {
              !takingLeave ? setTakingLeave(true) : setTakingLeave(false);
            }}
          />
          {takingLeave && (
            <div>
              <div>When will your terminal leave start?</div>
              <input
                className="terminal-leave-selector"
                type="date"
                value={createAccData.leave_start_date}
                onChange={(e) => {
                  setCreateAccData({
                    ...createAccData,
                    leave_start_date: e.target.value,
                  });
                }}
              />
            </div>
          )}
          <h3>Dependents:</h3>
          {/* here based on the input amount of dependents dinamicly render inputs for dependtes relationship to user */}
          <p>
            Do you have any dependents?{" "}
            <input
              className="dependent-checkbox"
              type="checkbox"
              value={haveDependents}
              onChange={() => {
                !haveDependents
                  ? setHaveDependents(true)
                  : setHaveDependents(false);
              }}
            />
          </p>
          {haveDependents && (
            <>
              <div className="depBtn" onClick={handleDepClick}></div>
              {dependents.map((input, index) => {
                return (
                  <div key={index}>
                    <div>{console.log(dependents)}</div>
                    <div>{console.log(input)}</div>
                    <label htmlFor="age">Age of dependent: </label>

                    <select onChange={(e)=>{handleDepAgeChange(index, e)}} name="age" id="age">
                      {numbers.map((elem) => {
                        return(
                        <option key={elem} value={elem}>{elem}</option>
              )})}
                    </select>
                    <input
                      className="createInputBox"
                      type="text"
                      name="relation"
                      placeholder="Relation"
                      value={input.relation}
                      onChange={(event) =>
                        handleDepRelationChange(index, event)
                      }
                    />
                    {
                      <div
                        className="button remove"
                        onClick={() => removeFormFields(index)}
                      >
                        Remove
                      </div>
                    }
                  </div>
                );
              })}
            </>
          )}
          <p>Relocating:</p>
          <input
            className="createInputBox"
            type="text"
            placeholder="PaceHolderText"
            name="planning_to_relocate"
            value={createAccData.planning_to_relocate}
            onChange={handleChange}
          />
          <p>Education:</p>
          <input
            className="createInputBox"
            type="text"
            placeholder="PaceHolderText"
            name="highest_education"
            value={createAccData.highest_education}
            onChange={handleChange}
          />
          <p>Desired Schooling:</p>
          <input
            className="createInputBox"
            type="text"
            placeholder="PaceHolderText"
            name="seeking_further_education"
            value={createAccData.seeking_further_education}
            onChange={handleChange}
          />
          <p>Interests:</p>
          <input
            className="createInputBox"
            type="text"
            placeholder="PaceHolderText"
            name="interests"
            value={createAccData.interests}
            onChange={handleChange}
          />

          <input
            type="submit"
            className="createBtn createAccBtn"
            value="Submit"
          />

          {/* <button
                        type='button'
                        className='loginBtn'
                        onClick={handleShowLoginModal}> Return to Log in <RiArrowGoBackFill /></button> */}
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default CreateAccountModal;
