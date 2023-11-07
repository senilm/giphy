'use client'
import { useContext, createContext,useState } from 'react'

export  const DataContext = createContext(null)

const DataProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(false)
    const [searchTerm, SetSearchTerm] = useState('welcome')

  return (
    <DataContext.Provider value={{setIsAuth, isAuth,searchTerm, SetSearchTerm}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider