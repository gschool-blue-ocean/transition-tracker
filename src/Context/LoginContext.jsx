import { useState, createContext } from 'react';

const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [userData, setUserData] = useState({})

    const invokeSetLogin = (value) => {
        setLogin(value)
    }

    return <LoginContext.Provider value={{
        login,
        userData,
        setUserData,
        invokeSetLogin
    }}>

        {children}
    </LoginContext.Provider>


}

export default LoginContext