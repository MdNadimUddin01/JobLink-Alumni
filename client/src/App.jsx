import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Event, Home, UserOutlet } from "./Pages"
import { AddEvent, AddJob, AlumniTable, SignIn, SignUp, VerifyEmail } from "./Component"


function App() {

  let route = createBrowserRouter([
    {
      path: "/",
      element: <UserOutlet />,
      // errorElement:<E
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "signIn",
          element: <SignIn />
        },
        {
          path: "signUp",
          element: <SignUp />
        },

        {
          path: "/events",
          element: <Event />
        },
        {
          path: "/jobs",
          element:<></>
        },


        // -------------------------------------------- Alumin --------------------------------------------------

        {
          path: "alumni/verifyEmail",
          element:<VerifyEmail/>
        },

        {
          path: "/alumni/addJobPost",
          element: <AddJob/>
        },
        {

          path: "/alumni/viewMyJob",
          element:<>View My Job</>
        },



        //------------------------------------------------ Admin ----------------------------------------
        {
          path: "/admin/alumni",
          element : <AlumniTable/>
        },
        
        {
          path: "/admin/events",
          element:<Event/>
        },
        {
          path: "/admin/addEvent",
          element:<AddEvent/>
        }

      ]
    }
  ])

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
