import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from "./app.routes"
import "./style.css"
import { AuthProvider } from './features/auth/context/auth.context'
import { InterviewProvider } from './features/interview/context/interview.context'

const App = () => {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App