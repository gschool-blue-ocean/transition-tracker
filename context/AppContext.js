import { useState, createContext } from 'react';

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
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
        invokeSetAllCohortsData,
        loading,
        setLoading
    }}>

        {children}
    </AppContext.Provider>


}

export default AppContext