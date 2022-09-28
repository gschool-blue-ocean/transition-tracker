import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import AppContext from "../../context/AppContext";
import { BsEyeFill } from "react-icons/bs";
import { MdOutlineAddCircle } from "react-icons/md";
import { AiFillMinusCircle, AiOutlineCheck } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa";
import style from "../../styles/CreateAccount.module.css";

//=============================imports================================
//This has the document.getElement at the very bottom- may be negligible

function CreateAccountModal() {
  //===============================states======================== I do think a lot of these states could be managed in Redux

  const { userData, invokeSetUserData, loading } = useContext(LoginContext);
  const { allUsersData } = useContext(AppContext);
  const [takingLeave, setTakingLeave] = useState(false);
  const [dependents, setDependents] = useState([]);
  const [haveDependents, setHaveDependents] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [allFormsFilled, setAllFormsFilled] = useState(null);
  const [submitClick, setSubmit] = useState(false);
  const [usernameFilled, setUsernameFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [etsDateFilled, setETSDateFilled] = useState(false);
  const [branchFilled, setBranchFilled] = useState(false);
  const [mosFilled, setMOSFilled] = useState(false);
  const [rankFilled, setRankFilled] = useState(false);
  const [dutyStationFilled, setDutyStationFilled] = useState(false);
  const [cityFilled, setCityFilled] = useState(false);
  const [stateFilled, setStateFilled] = useState(false);
  const [leaveStartFilled, setLeaveStartFilled] = useState(false);
  const [dependentsFilled, setDependentsFilled] = useState(false);
  const [educationFilled, setEducationFilled] = useState(false);
  const [interestsFilled, setInterestsFilled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [useSameUsername, setUseSameUsername] = useState(false);

  let navigate = useNavigate();

  //=================== loop for age in dependents drop down ==========================

  let numbers = [];
  for (let i = 0; i < 121; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);

  //======================= main create account state =====================

  const [createAccData, setCreateAccData] = useState({
    first: userData ? userData.first : "",
    last: userData ? userData.last : "",
    email: userData ? userData.email : "",
    username: userData ? userData.username : "",
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
    relocate_to_country: "",
    relocate_city: "",
    relocate_state: "",
    relocate_country: "",
    has_dependents: false,
    highest_education: "",
    seeking_further_education: false,
    admin: userData ? userData.admin : "",
    cohort_name: userData ? userData.cohort_name : "",
    cohort_id: userData ? userData.cohort_id : "",
    new_user: false,
  });

  //===================== field validation ========================
  //Here --> line 243 is just validating inputs by comparing states and using a Regex to validate password (consider implementing a library to condense)

  useEffect(() => {
    for (const user of allUsersData) {
      if (
        user.username === createAccData.username &&
        user.user_id === userData.user_id
      ) {
        setUseSameUsername(true);
        setUsernameValid(true);
        break;
      } else if (
        user.username === createAccData.username &&
        user.user_id !== userData.user_id
      ) {
        setUseSameUsername(false);
        setUsernameValid(false);
        break;
      } else if (user.username !== createAccData.username) {
        setUsernameValid(true);
        setUseSameUsername(false);
      }
    }

    if (
      createAccData.email.replace(/ /g, "").length < 3 ||
      !createAccData.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ||
      createAccData.username.replace(/ /g, "").length < 8 ||
      !usernameValid ||
      createAccData.password.replace(/ /g, "").length < 8 ||
      createAccData.rank.replace(/ /g, "").length < 2 ||
      createAccData.mos.replace(/ /g, "").length < 1 ||
      createAccData.interests.replace(/ /g, "").length < 10 ||
      createAccData.branch.replace(/ /g, "").length < 2 ||
      createAccData.duty_station.replace(/ /g, "").length < 2 ||
      createAccData.ets_date.replace(/ /g, "").length < 4 ||
      createAccData.city.replace(/ /g, "").length < 1 ||
      createAccData.state.replace(/ /g, "").length < 1 ||
      createAccData.highest_education.replace(/ /g, "").length < 2 ||
      (createAccData.has_dependents === true && dependents.length === 0) ||
      (takingLeave === true && createAccData.leave_start_date.length === 0) ||
      (createAccData.planning_to_relocate === true &&
        createAccData.relocate_to_country === true &&
        createAccData.relocate_country.replace(/ /g, "").length < 2) ||
      (createAccData.planning_to_relocate === true &&
        createAccData.relocate_to_country === false &&
        (createAccData.relocate_city.replace(/ /g, "").length < 2 ||
          createAccData.relocate_state.replace(/ /g, "").length < 2)) ||
      (createAccData.planning_to_relocate === true &&
        typeof createAccData.relocate_to_country !== "boolean")
    ) {
      setAllFormsFilled(false);
    } else {
      setAllFormsFilled(true);
    }

    if (
      createAccData.email.replace(/ /g, "").length < 3 ||
      !createAccData.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailFilled(false);
    } else {
      setEmailFilled(true);
    }

    if (createAccData.username.replace(/ /g, "").length < 8) {
      setUsernameFilled(false);
    } else {
      setUsernameFilled(true);
    }

    if (createAccData.password.replace(/ /g, "").length < 8) {
      setPasswordFilled(false);
    } else {
      setPasswordFilled(true);
    }

    if (createAccData.rank.replace(/ /g, "").length < 2) {
      setRankFilled(false);
    } else {
      setRankFilled(true);
    }

    if (createAccData.mos.replace(/ /g, "").length < 1) {
      setMOSFilled(false);
    } else {
      setMOSFilled(true);
    }

    if (createAccData.branch.replace(/ /g, "").length < 2) {
      setBranchFilled(false);
    } else {
      setBranchFilled(true);
    }

    if (createAccData.duty_station.replace(/ /g, "").length < 2) {
      setDutyStationFilled(false);
    } else {
      setDutyStationFilled(true);
    }

    if (createAccData.ets_date.replace(/ /g, "").length < 4) {
      setETSDateFilled(false);
    } else {
      setETSDateFilled(true);
    }

    if (createAccData.city.replace(/ /g, "").length < 1) {
      setCityFilled(false);
    } else {
      setCityFilled(true);
    }

    if (createAccData.state.replace(/ /g, "").length < 1) {
      setStateFilled(false);
    } else {
      setStateFilled(true);
    }

    if (createAccData.has_dependents === true && dependents.length === 0) {
      setDependentsFilled(false);
    } else {
      setDependentsFilled(true);
    }

    if (takingLeave === true && createAccData.leave_start_date.length === 0) {
      setLeaveStartFilled(false);
    } else {
      setLeaveStartFilled(true);
    }

    if (createAccData.highest_education.replace(/ /g, "").length < 2) {
      setEducationFilled(false);
    } else {
      setEducationFilled(true);
    }

    if (createAccData.interests.replace(/ /g, "").length < 10) {
      setInterestsFilled(false);
    } else {
      setInterestsFilled(true);
    }
  });

  //========================== update user profile ========================
  //here through 272 is potentially redundant but more investigation is needed
  useEffect(() => {
    if (!createAccData.planning_to_relocate) {
      setCreateAccData({
        ...createAccData,
        relocate_city: "",
        relocate_state: "",
        relocate_to_country: "",
        relocate_country: "",
      });
    }
  }, [createAccData.planning_to_relocate]);

  useEffect(() => {
    if (!createAccData.relocate_to_country) {
      setCreateAccData({
        ...createAccData,
        relocate_country: "",
      });
    } else if (createAccData.relocate_to_country) {
      setCreateAccData({
        ...createAccData,
        relocate_city: "",
        relocate_state: "",
      });
    }
  }, [createAccData.relocate_to_country]);

  const updateUser = () => {
    fetch(
      `https://hacking-transition.herokuapp.com/api/update/user/${userData.user_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createAccData),
      }
    )
      .then((res) => {
        res.json();
      })
      .then((data) => console.log(data))
      .catch(console.error());
  };
  const updateDependentInfo = () => {
    if (dependents[0] != null) {
      dependents.forEach((dependent) => {
        dependent.sponsor_id = userData.user_id;

        fetch(`https://hacking-transition.herokuapp.com/api/create/dependent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dependent),
        }).catch(console.error());
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    if (typeof createAccData.relocate_to_country === "string") {
      createAccData.relocate_to_country = false;
    }
    updateUser();
    updateDependentInfo();
    localStorage.clear();
    window.setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

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

  //========================form display================================================================

  const hideForm = {
    display: "none",
  };
  const showForm = {
    display: "block",
  };

  //========================== what's being rendered ================================
  //This is the entire questionnaire and how they store the answers to the questionnaire to the user

  return ReactDOM.createPortal(
    <div className={style.createModalContainer}>
      <div
        style={formSubmit ? hideForm : showForm}
        className={style.createContainer}
      >
        <div className={style.header - div}>
          <h1 className={style.welcome - header}>Welcome</h1>
        </div>
        <h3 className={style.sub - headers}>
          Please fill in your information below.
        </h3>
        <br></br>
        <form className={style.createForm} onSubmit={handleSubmit}>
          <div className={style.wholeUserCredential}>
            <h3 className={style.sub - headers}>User Credentials</h3>
            <div className={style.account - info}>
              <div className={style.username - required}>
                <div className={style.username - div}>
                  {!usernameFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>Username:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="Desired Username"
                    name="username"
                    value={createAccData.username}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        username: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.credentials - require}>
                  <div className={style.username - validation - message}>
                    {!usernameFilled && (
                      <span className={style.required - fields}>
                        Minimum of 8 characters
                      </span>
                    )}
                    {useSameUsername && createAccData.username.length > 7 && (
                      <span className={style.same - username}>
                        It's recommended that you change your username.
                      </span>
                    )}
                    {usernameValid && createAccData.username.length > 7 && (
                      <span className={style.username - valid}>
                        This username is available!
                      </span>
                    )}
                    {!usernameValid && createAccData.username.length > 7 && (
                      <span className={style.username - invalid}>
                        This username is already taken!
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.email - require}>
                <div className={style.email - div}>
                  {!emailFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>Email:</p>
                  <input
                    className={style.createInputBox}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={createAccData.email}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        email: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.credentials - require}>
                  {!emailFilled && (
                    <span className={style.required - fields}>
                      Minimum of 3 characters & must be an email
                    </span>
                  )}
                </div>
              </div>
              <div className={style.password - require}>
                <div className={style.password - div}>
                  {!passwordFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>New password:</p>
                  <input
                    className={style.password}
                    type={!showPassword ? "password" : "text"}
                    placeholder="Desired Password"
                    name="password"
                    value={createAccData.password}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        password: e.target.value,
                      });
                    }}
                    required
                  />
                  <BsEyeFill
                    className={style.show - password}
                    onClick={() => {
                      showPassword
                        ? setShowPassword(false)
                        : setShowPassword(true);
                    }}
                  />
                </div>
                <div className={style.credentials - require}>
                  {!passwordFilled && (
                    <span className={style.required - fields}>
                      Minimum of 8 characters
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={style.wholeServiceInfo}>
            <h3 className={style.sub - headers}>Service Info</h3>
            <div className={style.createInnerCredentials}>
              <div className={style.service - info - 1}>
                <div className={style.ets - div}>
                  {!etsDateFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>ETS Date:</p>
                  <input
                    className={style.createInputBox}
                    type="date"
                    name="ets_date"
                    value={createAccData.ets_date}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        ets_date: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.branch - div}>
                  {!branchFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>Branch of service:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="Branch"
                    name="branch"
                    value={createAccData.branch}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        branch: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.mos - div}>
                  {!mosFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>MOS/Rate:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="MOS"
                    name="mos"
                    value={createAccData.mos}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        mos: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.rank - div}>
                  {!rankFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>Rank:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="Rank"
                    name="rank"
                    value={createAccData.rank}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        rank: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className={style.service - info - 2}>
                <div className={style.taps - div}>
                  <p>TAPS complete:</p>
                  <input
                    type="checkbox"
                    value={createAccData.taps_complete}
                    onChange={() => {
                      !createAccData.taps_complete
                        ? setCreateAccData({
                            ...createAccData,
                            taps_complete: true,
                          })
                        : setCreateAccData({
                            ...createAccData,
                            taps_complete: false,
                          });
                    }}
                  />
                </div>
                <div className={style.duty - station - div}>
                  {!dutyStationFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>Duty Station:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="Duty Station"
                    name="duty_station"
                    value={createAccData.duty_station}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        duty_station: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.city - div}>
                  {!cityFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>City:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="City"
                    name="city"
                    value={createAccData.city}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        city: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className={style.state - div}>
                  {!stateFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <p>State:</p>
                  <input
                    className={style.createInputBox}
                    type="text"
                    placeholder="State"
                    name="state"
                    value={createAccData.state}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        state: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.wholeLeaveDiv}>
            <h3 className={style.sub - headers}>Leave</h3>
            <div className={style.leave - p}>
              <p>Terminal Leave:</p>
            </div>
            <div className={style.leave - div}>
              <div className={style.leave - question}>
                <div>Will you be taking terminal leave?</div>
                <input
                  className={style.terminal - leave - checkbox}
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
                <div className={style.leave - calender}>
                  {!leaveStartFilled && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                  <div>When will your terminal leave start?</div>
                  <input
                    className={style.terminal - leave - selector}
                    type="date"
                    value={createAccData.leave_start_date}
                    onChange={(e) => {
                      setCreateAccData({
                        ...createAccData,
                        leave_start_date: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              )}
            </div>
          </div>
          <div className={style.wholeDependentDiv}>
            <h3 className={style.sub - headers}>Dependents</h3>
            {/* here based on the input amount of dependents dinamicly render inputs for dependents relationship to user */}
            <div className={style.dependent - question}>
              <div>Do you have any dependents?</div>

              <input
                className={style.dependent - checkbox}
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
              <div className={style.dependent - div}>
                <div className={style.dependent - remove - div}>
                  <div>
                    {!dependentsFilled && (
                      <FaAsterisk className={style.required - fields} />
                    )}{" "}
                    Click the plus button to add as many dependents as needed:
                  </div>
                  <MdOutlineAddCircle
                    className={style.add - dependent}
                    onClick={handleDepClick}
                  />
                </div>
                {dependents.map((input, index) => {
                  return (
                    <div className={style.relation - div} key={index}>
                      <label htmlFor="age">Age of dependent: </label>

                      <select
                        onChange={(e) => {
                          handleDepAgeChange(index, e);
                        }}
                        name="age"
                        id="age"
                      >
                        {numbers.map((elem) => {
                          return (
                            <option key={elem} value={elem}>
                              {elem}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        className={style.createInputBox}
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
                          className={style.remove - dependent}
                          onClick={() => removeFormFields(index)}
                        />
                      }
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={style.wholeRelocationDiv}>
            <h3 className={style.sub - headers}>Relocation</h3>
            <div className={style.relocate - div}>
              <div className={style.relocate - input - and - label}>
                <p>Planning to relocate?</p>
                <input
                  className={style.createInputBox}
                  type="checkbox"
                  name="planning_to_relocate"
                  value={createAccData.planning_to_relocate}
                  onChange={() => {
                    !createAccData.planning_to_relocate
                      ? setCreateAccData({
                          ...createAccData,
                          planning_to_relocate: true,
                        })
                      : setCreateAccData({
                          ...createAccData,
                          planning_to_relocate: false,
                        });
                  }}
                />
              </div>
              <div className={style.country - as}>
                {createAccData.planning_to_relocate &&
                  createAccData.relocate_to_country === "" && (
                    <FaAsterisk className={style.required - fields} />
                  )}
                {createAccData.planning_to_relocate && (
                  <div className={style.country - question}>
                    <p>Are you moving out of country?</p>
                    <div className={style.country - question - radio}>
                      <input
                        type="radio"
                        name="country_move"
                        onChange={() => {
                          setCreateAccData({
                            ...createAccData,
                            relocate_to_country: true,
                          });
                        }}
                      />
                      <div className={style.radio}>
                        <label htmlFor="yes">Yes</label>
                        <input
                          type="radio"
                          name="country_move"
                          onChange={() => {
                            setCreateAccData({
                              ...createAccData,
                              relocate_to_country: false,
                            });
                          }}
                        />
                        <label htmlFor="no">No</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {createAccData.relocate_to_country &&
                createAccData.planning_to_relocate && (
                  <div className={style.country - input - as}>
                    <div className={style.country - question - as}>
                      {createAccData.relocate_to_country === true &&
                        createAccData.relocate_country.length < 2 && (
                          <FaAsterisk className={style.required - fields} />
                        )}
                      <p>What country are you planning to move to:</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Country"
                      onChange={(e) => {
                        setCreateAccData({
                          ...createAccData,
                          relocate_country: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
              {createAccData.relocate_to_country === false &&
                createAccData.planning_to_relocate && (
                  <div className={style.city - state - relocate - div - label}>
                    <p>Where are you planning to move:</p>
                    <div className={style.city - state - relocate - div}>
                      <div className={style.city - relocate - input - div}>
                        {!createAccData.relocate_to_country &&
                          createAccData.relocate_city.length < 2 && (
                            <FaAsterisk className={style.required - fields} />
                          )}
                        <p>City:</p>
                        <input
                          type="text"
                          placeholder="City"
                          value={createAccData.relocate_city}
                          onChange={(e) => {
                            setCreateAccData({
                              ...createAccData,
                              relocate_city: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className={style.state - relocate - input - div}>
                        {!createAccData.relocate_to_country &&
                          createAccData.relocate_state.length < 2 && (
                            <FaAsterisk className={style.required - fields} />
                          )}
                        <p>State:</p>
                        <input
                          type="text"
                          placeholder="State"
                          value={createAccData.relocate_state}
                          onChange={(e) => {
                            setCreateAccData({
                              ...createAccData,
                              relocate_state: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className={style.wholeEducationDiv}>
            <h3 className={style.sub - headers}>Education</h3>
            <div className={style.education - div}>
              <div className={style.highest - edu - question}>
                {!educationFilled && (
                  <FaAsterisk className={style.required - fields} />
                )}
                <p>What's your highest level of education?</p>
                <input
                  className={style.education - input}
                  type="text"
                  placeholder="Education"
                  name="highest_education"
                  value={createAccData.highest_education}
                  onChange={(e) => {
                    setCreateAccData({
                      ...createAccData,
                      highest_education: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className={style.seeking - higher - edu}>
                <p>Are you planning to seek further education?</p>
                <input
                  className={style.createInputBox}
                  type="checkbox"
                  name="seeking_further_education"
                  value={createAccData.seeking_further_education}
                  onChange={() => {
                    createAccData.seeking_further_education
                      ? setCreateAccData({
                          ...createAccData,
                          seeking_further_education: false,
                        })
                      : setCreateAccData({
                          ...createAccData,
                          seeking_further_education: true,
                        });
                  }}
                />
              </div>
            </div>
          </div>
          <div className={style.interests - div}>
            <div className={style.interests - as}>
              {!interestsFilled && (
                <FaAsterisk className={style.required - fields} />
              )}
              <h3 className={style.sub - headers}>Interests</h3>
            </div>
            <div className={style.interests - require}>
              <p className={style.interests - sub - header}>
                Tell us about some of your interests:
              </p>
              {!interestsFilled && (
                <span className={style.required - fields}>
                  Minimum of 10 characters
                </span>
              )}
            </div>
            <textarea
              onChange={(e) => {
                setCreateAccData({
                  ...createAccData,
                  interests: e.target.value,
                });
              }}
              placeholder="Tell us about yourself..."
              cols="40"
              rows="8"
              required
            />
          </div>
          {allFormsFilled && (
            <div
              className={style.submit - create - account}
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            >
              <AiOutlineCheck className={style.checkmark - submit - btn} />
            </div>
          )}
          {/* <button
                        type='button'
                        className={style.loginBtn}
                        onClick={handleShowLoginModal}> Return to Log in <RiArrowGoBackFill /></button> */}
        </form>
      </div>
      <div
        className={style.success - message - div}
        style={formSubmit ? showForm : hideForm}
      >
        <h1 className={style.success - message}>
          You're account has been successfully created! <br /> Please login.
        </h1>
      </div>
    </div>,
    typeof document !== "undefined" && document.getElementById("portal")
  );
}

export default CreateAccountModal;
