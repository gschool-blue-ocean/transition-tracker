import { useState, createContext } from 'react';

const LoadingContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    const changeSetLoading = (value) => {
        setLoading(value)
    }

    return <LoadingContext.Provider value={{
        loading,
        changeSetLoading
    }}>

        {children}
    </LoadingContext.Provider>


}

export default LoadingContext