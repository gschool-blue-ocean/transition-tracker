import { useState, createContext } from 'react';

const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [userData, setUserData] = useState({})

    const changeSetLogin = (value) => {
        setLogin(value)
    }

    return <LoginContext.Provider value={{
        login,
        userData,
        setUserData,
        changeSetLogin
    }}>

        {children}
    </LoginContext.Provider>


}

export default LoginContext