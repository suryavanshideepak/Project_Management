import React, { createContext, useState } from 'react'

export const Context = createContext('')
const MainContext = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

    return (
    <Context.Provider value={{isAuth, setIsAuth}}>
        {children}
    </Context.Provider>
  )
}

export default MainContext