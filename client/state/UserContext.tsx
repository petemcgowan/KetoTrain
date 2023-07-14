import React, { createContext, useState, ReactNode } from 'react'

export interface UserContextProps {
  emailAddress: string | null
  setEmailAddress: React.Dispatch<React.SetStateAction<string | null>>
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
  const [userId, setUserId] = useState<number | null>(null)
  const [emailAddress, setEmailAddress] = useState<string | null>(null)
  const [consumptionDate, setConsumptionDate] = useState<string>(
    new Date().toISOString()
  )

  return (
    <UserContext.Provider
      value={{
        emailAddress,
        setEmailAddress,
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
