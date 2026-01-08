import React, { createContext, useState, ReactNode } from 'react';

export interface UserContextProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  consumptionDate: string;
  setConsumptionDate: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [consumptionDate, setConsumptionDate] = useState<string>(
    new Date().toISOString(),
  );

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        consumptionDate,
        setConsumptionDate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
