import React, { createContext, useState, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import { updateEmailAddress } from '../redux/action-creators'

export interface UserContextProps {
  // emailAddress: string | null
  // setEmailAddress: React.Dispatch<React.SetStateAction<string | null>>
  userId: number | null
  setUserId: React.Dispatch<React.SetStateAction<number | null>>
  consumptionDate: string
  setConsumptionDate: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<UserContextProps | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // const dispatch = useDispatch()
  const [userId, setUserId] = useState<number | null>(null)
  // const [emailAddress, setEmailAddressState] = useState<string | null>(null)
  const [consumptionDate, setConsumptionDate] = useState<string>(
    new Date().toISOString()
  )

  // const setEmailAddress = (email: string | null) => {
  //   setEmailAddressState(email)
  //   dispatch(updateEmailAddress(email)) // update Redux store
  // }

  return (
    <UserContext.Provider
      value={{
        // emailAddress,
        // setEmailAddress,
        userId,
        setUserId,
        consumptionDate,
        setConsumptionDate,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
