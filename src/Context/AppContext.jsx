import { useState, createContext } from 'react';

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [allUsersData, setAllUsersData] = useState([])
    const [allCohortsData, setAllCohortsData] = useState([])

    const applySetAllUsersData = () => {
        setAllUsersData()
    }
    const applySetAllCohortsData = () => {
        setAllCohortsData()
    }

    return <AppContext.Provider value={{
        allUsersData,
        allCohortsData
    }}>

        {children}
    </AppContext.Provider>


}

export default AppContext