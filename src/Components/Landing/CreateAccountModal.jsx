import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";
import { BsEyeFill } from "react-icons/bs";
import { MdOutlineAddCircle } from "react-icons/md";
import { AiFillMinusCircle, AiOutlineCheck } from "react-icons/ai";
import { FaAsterisk } from 'react-icons/fa'
import '../../StyleSheets/CreateAccount.css'

//=============================imports================================

function CreateAccountModal() {
  //===============================states========================
  
  const { userData, invokeSetUserData, loading } = useContext(LoginContext);
  const [takingLeave, setTakingLeave] = useState(false);
  const [dependents, setDependents] = useState([]);
  const [haveDependents, setHaveDependents] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [allFormsFilled, setAllFormsFilled] = useState(null);
  const [submitClick, setSubmit] = useState(false);

  let navigate = useNavigate();

  //=================== loop for age in dependents drop down ==========================

  let numbers = [];
  for (let i = 0; i < 121; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    if(!userData){
      navigate('/')
    }
  }, [])

  //======================= main create account state =====================

  const [createAccData, setCreateAccData] = useState({
    first: userData ? userData.first : '',
    last: userData ? userData.last : '',
    email: userData ? userData.email : '',
    username: userData ? userData.username : '',
    password: "",
    rank: "",
    mos: "",
    interests: "",
    branch: "",
    duty_station: "",
    taps_complete: false,
    leave_start_date: "",
    ets_date: "",
    planning_to_relocate: false,
    city: "",
    state: "",
    has_dependents: false,
    highest_education: "",
    seeking_further_education: false,
    admin: userData ? userData.admin : '',
    cohort_name: userData ? userData.cohort_name : '',
    cohort_id: userData ? userData.cohort_id : '',
    new_user: true,
  });

  useEffect(()=>{
     if(createAccData.email.length < 3 ||
      createAccData.username.length < 8 ||
      createAccData.password.length < 8 ||
      createAccData.rank.length < 2 ||
      createAccData.mos.length < 1 ||
      createAccData.interests.length < 10 ||
      createAccData.branch.length < 2 ||
      createAccData.duty_station.length < 2 ||
      createAccData.ets_date.length < 4 ||
      createAccData.city.length < 1 ||
      createAccData.state.length < 1 ||
      (createAccData.has_dependents === true && dependents.length === 0) ||
      (takingLeave === true && createAccData.leave_start_date.length === 0)){
        setAllFormsFilled(false)
      }else{
        setAllFormsFilled(true)
      }
  })

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
  const updateDependentInfo = () => {

      if(dependents[0] != null){
        dependents.forEach((dependent) => {
        dependent.sponsor_id = userData.user_id;
      
        fetch(
          `http://hacking-transition.herokuapp.com/api/create/dependent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dependent),
          }
        ).catch(console.error());
      })}
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    updateDependentInfo();
    invokeSetUserData({});
    localStorage.clear();
    alert("Account successfully created! Please log in");
    navigate("/");
  };

  //======================= handle dependents functions ===============================

  const handleDepClick = () => {
    setDependents([...dependents, { age: 0, relation: "" }]);
  };
  const removeFormFields = (index) => {
    let newFormValues = [...dependents];
    newFormValues.splice(index, 1);
    setDependents(newFormValues);
  };
  const handleDepAgeChange = (index, event) => {
    let data = [...dependents];
    data[index].age = parseInt(event.target.value);
    setDependents(data);
  };
  const handleDepRelationChange = (index, event) => {
    let data = [...dependents];
    data[index].relation = event.target.value;
    setDependents(data);
  };

  //===================taking leave func and useEffect ================================

  const clearLeave = () => {
    if (!takingLeave) {
      setCreateAccData({ ...createAccData, leave_start_date: "" });
    }
  };

  useEffect(() => {
    clearLeave();
  }, [takingLeave]);

//=============================Dependents func and useEffect===========================

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

  //========================== what's being rendered ================================

  return ReactDOM.createPortal(
    <div className="createModalContainer">
      <div className="createContainer">
        <div className="header-div">
        <h1 className='welcome-header'>Welcome</h1>
        </div>
        <h3 className="sub-headers">Please fill in your information below.</h3>
        <br></br>
          <form className="createForm" onSubmit={handleSubmit}>
        <div className="wholeUserCredential">
          <h3 className="sub-headers">User Credentials</h3>
              <div className="account-info">
                <div className="username-with-required">
                <div className="username-div">
                <FaAsterisk className="required-fields"/>
                <p>Username:</p>
                <input
                  className="createInputBox"
                  type="text"
                  placeholder="Desired Username"
                  name="username"
                  value={createAccData.username}
                  onChange={(e)=>{setCreateAccData({...createAccData, username: e.target.value})}}
                />
                
              </div>
              <div className="credentials-require">
              <span className="required-fields">Minimum of 8 characters</span>
              </div>
              </div>
              <div className="email-with-require">
              <div className="email-div">
              <FaAsterisk className="required-fields"/>
              <p>Email:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="Email"
                name="email"
                value={createAccData.email}
                onChange={(e)=>{setCreateAccData({...createAccData, email: e.target.value})}}
              />
              </div>
              <div className="credentials-require">
              <span className="required-fields">Minimum of 3 characters</span>
              </div>
              </div>
              <div className="password-require">
              <div className="password-div">
              <FaAsterisk className="required-fields"/>
              <p>New password:</p>
              <input
                className="password"
                type={!showPassword ? 'password' : 'text'}
                placeholder="Desired Password"
                name="password"
                value={createAccData.password}
                onChange={(e)=>{setCreateAccData({...createAccData, password: e.target.value})}}
              />
              <BsEyeFill className="show-password" onClick={()=>{showPassword ? setShowPassword(false) : setShowPassword(true)}}/>
              </div>
              <div className="credentials-require">
              <span className="required-fields">Minimum of 8 characters</span>
              </div>
              </div>
            </div>
            </div>
         <div className="wholeServiceInfo">
          <h3 className="sub-headers">Service Info</h3>
          <div className="createInnerCredentials">
            <div className="service-info-1">
              <div className="ets-div">
              <FaAsterisk className="required-fields"/>
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
              </div>
              <div className="branch-div">
              <FaAsterisk className="required-fields"/>
              <p>Branch of service:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="Branch"
                name="branch"
                value={createAccData.branch}
                onChange={(e)=>{setCreateAccData({...createAccData, branch: e.target.value})}}
              />
              </div>
              <div className='mos-div'>
              <FaAsterisk className="required-fields"/>
              <p>MOS/Rate:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="MOS"
                name="mos"
                value={createAccData.mos}
                onChange={(e)=>{setCreateAccData({...createAccData, mos: e.target.value})}}
              />
              </div>
              <div className="rank-div">
              <FaAsterisk className="required-fields"/>
              <p>Rank:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="Rank"
                name="rank"
                value={createAccData.rank}
                onChange={(e)=>{setCreateAccData({...createAccData, rank: e.target.value})}}
              />
              </div>
            </div>
            <div className="service-info-2">
              <div className="taps-div">
              <p>TAPS complete:</p><input
              type="checkbox"
              value={createAccData.taps_complete}
              onChange={()=>{!createAccData.taps_complete ? setCreateAccData({...createAccData, taps_complete: true}) : setCreateAccData({...createAccData, taps_complete: false})}}
              />
              </div>
              <div className="duty-station-div">
              <FaAsterisk className="required-fields"/>
              <p>Duty Station:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="Duty Station"
                name="duty_station"
                value={createAccData.duty_station}
                onChange={(e)=>{setCreateAccData({...createAccData, duty_station: e.target.value})}}
              />
              </div>
              <div className='city-div'>
              <FaAsterisk className="required-fields"/>
              <p>City:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="City"
                name="city"
                value={createAccData.city}
                onChange={(e)=>{setCreateAccData({...createAccData, city: e.target.value})}}
              />
              </div>
              <div className="state-div">
              <FaAsterisk className="required-fields"/>
              <p>State:</p>
              <input
                className="createInputBox"
                type="text"
                placeholder="State"
                name="state"
                value={createAccData.state}
                onChange={(e)=>{setCreateAccData({...createAccData, state: e.target.value})}}
              />
              </div>
            </div>
          </div>
          </div>
          <div className="wholeLeaveDiv">
          <h3 className="sub-headers">Leave</h3>
          <div className="leave-p">
          <p>Terminal Leave:</p>
          </div>
          <div className="leave-div">
            <div className="leave-question">
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
          </div>
          {takingLeave && (
            <div className="leave-calender">
              <FaAsterisk className="required-fields"/>
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
          </div>
          </div>
          <div className="wholeDependentDiv">
          <h3 className="sub-headers">Dependents</h3>
          {/* here based on the input amount of dependents dinamicly render inputs for dependtes relationship to user */}
          <div className="dependent-question">
            <div>Do you have any dependents?</div>

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
            </div>
          {haveDependents && (
            <div className="dependent-div">
              <div className="dependent-remove-div">
              <div><FaAsterisk className="required-fields"/> Click the plus button to add as many dependents as needed:</div>
              <MdOutlineAddCircle className="add-dependent" onClick={handleDepClick}/>
              </div>
              {dependents.map((input, index) => {
                return (
                  <div className="relation-div" key={index}>
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
                      <AiFillMinusCircle
                        className="remove-dependent"
                        onClick={() => removeFormFields(index)}
                      />
                    }
                  </div>
                );
              })}
            </div>
          )}
          </div>
          <div className="wholeRelocationDiv">
          <h3 className="sub-headers">Relocation</h3>
          <div className="relocate-div">
          <p>Planning to relocate?</p>
          <input
            className="createInputBox"
            type="checkbox"
            name="planning_to_relocate"
            value={createAccData.planning_to_relocate}
            onChange={()=>{!createAccData.planning_to_relocate ? setCreateAccData({...createAccData, planning_to_relocate: true}) : setCreateAccData({...createAccData, planning_to_relocate: false})}}
          />
          </div>
          </div>
          <div className="wholeEducationDiv">
          <h3 className="sub-headers">Education</h3>
          <div className="education-div">
            <div className="highest-edu-question">
          <FaAsterisk className="required-fields"/>
          <p>What's your highest level of education?</p>
          <input
            className="education-input"
            type="text"
            placeholder="Education"
            name="highest_education"
            value={createAccData.highest_education}
            onChange={(e)=>{setCreateAccData({...createAccData, highest_education: e.target.value})}}
          />
          </div>
          <div className="seeking-higher-edu">
          <p>Are you planning to seek further education?</p>
          <input
            className="createInputBox"
            type="checkbox"
            name="seeking_further_education"
            value={createAccData.seeking_further_education}
            onChange={()=>{createAccData.seeking_further_education ? setCreateAccData({...createAccData, seeking_further_education: false}) : setCreateAccData({...createAccData, seeking_further_education: true})}}
          />
          </div>
          </div>
          </div>
          <div className="interests-div">
            <div className="interests-with-as"><FaAsterisk className="required-fields"/><h3 className="sub-headers">Interests</h3></div>
            <div className="interests-with-require">
          <p className="interests-sub-header">Tell us about some of your interests:</p>
          <span className="required-fields">Minimum of 10 characters</span>
          </div>
          <textarea 
          onChange={(e)=>{setCreateAccData({...createAccData, interests: e.target.value})}}
          placeholder="Tell us about yourself..." 
          cols="40" 
          rows="8"
          />
          </div>
          {allFormsFilled &&
          <div 
          className="submit-create-account"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          >
          <AiOutlineCheck
          className="checkmark-submit-btn"
          />
          </div>
          }

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

