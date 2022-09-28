import { useContext, useState, React } from "react";
import AppContext from "../../context/AppContext";
import { FiEdit } from "react-icons/fi";

export default function EditableCohort({ name, start, end, id }) {
  const { allCohortsData } = useContext(AppContext); // imports allCohortsData from the AppContext
  const [cohortData] = useState(allCohortsData.find((x) => x.cohort_id == id)); // looks for a certain cohort id and grabs its data
  const [currentName, setName] = useState(name);
  const [currentStartDate, setStartDate] = useState(start);
  const [currentEndDate, setEndDate] = useState(end);
  const [editing, edit] = useState(false);
  const [archived, setArchived] = useState(false);

  const toggleEditing = () => edit(!editing);
  const checkName = (e) => setName(e.currentTarget.value);
  const checkStartDate = (e) => setStartDate(e.currentTarget.value);
  const checkEndDate = (e) => setEndDate(e.currentTarget.value);

  /*************** Form submit fn to update cohort data, for a specific cohort ***************/
  const submitFxn = () => {
    cohortData.cohort_name = currentName;
    cohortData.start_date = currentStartDate;
    cohortData.end_date = currentEndDate;
    console.log(JSON.stringify(cohortData));
    toggleEditing();
    fetch(`http://hacking-transition.herokuapp.com/api/update/cohort/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cohortData),
    });
    console.log("ran the thing");
  };
  /*************** END Form submit fn to update cohort data, for a specific cohort ***************/

  // If they press enter submit form
  const checkKey = (e) => {
    if (e.keyCode === 13) submitFxn();
  };

  /*************** Archive Cohort Functions ***************/
  const archiveCohort = () => {
    setArchived(true);
    console.log(cohortData);
    console.log(id);
    fetch(`http://hacking-transition.herokuapp.com/api/archive/cohort/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ active: false }),
    }).then(alert("Cohort Archived"));
  };

  const unArchiveCohort = () => {
    setArchived(false);
    console.log(cohortData);
    console.log(id);
    fetch(`http://hacking-transition.herokuapp.com/api/archive/cohort/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ active: true }),
    }).then(alert("Cohort Activated"));
  };
  /*************** END Archive Cohort Functions ***************/

  const deleteCohort = () => {
    fetch(`http://hacking-transition.herokuapp.com/api/delete/cohort/${id}`, {
      method: "DELETE",
      mode: "cors",
    }).then(alert("Cohort Deleted"));
  };

  // If we are editing the cohort then display a form, otherwise just show its name, end and start date
  if (editing)
    return (
      <div className="editCohortFields">
        Cohort Name:
        <input
          type="text"
          placeholder="Cohort name can't be blank"
          value={currentName}
          onChange={checkName}
          onKeyDown={checkKey}
        />
        <br />
        Start Date:
        <input
          type="text"
          placeholder="Start date can't be blank"
          value={currentStartDate}
          onChange={checkStartDate}
          onKeyDown={checkKey}
        />
        <br />
        End Date:
        <input
          type="text"
          placeholder="End date can't be blank"
          value={currentEndDate}
          onChange={checkEndDate}
          onKeyDown={checkKey}
        />
        <br />
        <button onClick={toggleEditing}>Back</button>{" "}
        <button onClick={submitFxn}>Submit</button>{" "}
        {archived ? (
          <button onClick={unArchiveCohort}>Activate</button>
        ) : (
          <button onClick={archiveCohort}>Archive</button>
        )}
        <button onClick={deleteCohort}>Delete</button>{" "}
      </div>
    );
  else
    return (
      <>
        {currentName}
        <br />
        Starts: {currentStartDate}
        <br />
        Ends: {currentEndDate}
        <button onClick={toggleEditing}>
          <FiEdit />
        </button>
      </>
    );
}
