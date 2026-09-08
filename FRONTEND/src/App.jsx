import { RouterProvider } from "react-router"
import router from "./App.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import {InterviewProvider} from "./features/Interview/interview.context.jsx"

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
    
  )

  
  }
export default App
