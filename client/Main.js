import React from 'react'
import { UserProvider } from './state/UserContext'
import App from './App'

export const Main: React.FC = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  )
}

export default Main
