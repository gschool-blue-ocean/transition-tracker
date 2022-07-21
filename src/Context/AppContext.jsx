import { useState, createContext } from 'react';

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [allUsersData, setAllUsersData] = useState([])
    const [allCohortsData, setAllCohortsData] = useState([])

    const invokeSetAllUsersData = (userData) => {
        setAllUsersData(userData)
    }
    const invokeSetAllCohortsData = (cohortData) => {
        setAllCohortsData(cohortData)
    }

    return <AppContext.Provider value={{
        allUsersData,
        allCohortsData,
        invokeSetAllUsersData,
        invokeSetAllCohortsData
    }}>

        {children}
    </AppContext.Provider>


}

export default AppContext