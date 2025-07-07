import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router/Router'
import { AuthProvider } from './Context/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  )
}

export default App
