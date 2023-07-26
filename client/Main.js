import React from 'react'
import { UserProvider } from './state/UserContext'
import { ThemeProvider } from './state/ThemeContext'
import App from './App'

export const Main: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  )
}

export default Main
