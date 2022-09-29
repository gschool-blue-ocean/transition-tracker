import server from "../config";
export const fetchAllUserData = async (setAllUserData,setLoading) => {
    await fetch(`${server}/api/users`)
      .then((res) => res.json())
      .then((data) => (console.log(data, 'getAllUsers'), setAllUserData(data)))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  export const fetchAllCohortData = async (setCohortData) => {
    await fetch(`${server}/api/cohorts`)
      .then((res) => res.json())
      .then((data) => (console.log(data,'getAllCohorts'), setCohortData(data)))
      .catch((err) => console.log(err));
  };