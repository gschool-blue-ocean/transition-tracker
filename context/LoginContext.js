import { useState, createContext } from 'react';

// Creates a Context object. When React renders a component that subscribes to this Context object it
// will read the current context value from the closest matching Provider above it in the tree.

const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [userData, setUserData] = useState(null)

    const invokeSetLogin = (value) => {
        setLogin(value)
    }
    const invokeSetUserData = (value) => {
        setUserData(value)
    }

    return <LoginContext.Provider value={{
        login,
        userData,
        setUserData,
        invokeSetUserData,
        invokeSetLogin
    }}>

        {children}
    </LoginContext.Provider>


}

export default LoginContext