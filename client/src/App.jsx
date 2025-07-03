import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Event, Home, UserOutlet, ViewAllJob } from "./Pages"
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
          element: <ViewAllJob myjob={false}/>
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
          element:<ViewAllJob myjob={true}/>
        },
        {
          path: "/alumni/updateJob/:jobId",
          element:<AddJob/>
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
