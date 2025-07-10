import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Event, Home, UserOutlet, ViewAllJob ,ViewAllForum } from "./Pages"
import { AddEvent, AddForum, AddJob, AlumniTable, SignIn, SignUp, VerifyEmail } from "./Component"


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
        // ------------------------------ job ------------------------------
        {
          path: "/jobs",
          element: <ViewAllJob myjob={false}/>
        },


        // -------------------------------------------- Alumin --------------------------------------------------

        {
          path: "alumni/verifyEmail",
          element:<VerifyEmail/>
        },

            // ------------------------------- JOB -------------------------------
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
       

        // --------------------------------- FORUM ------------------------------------
          
        {
          path: "/alumni/addForum",
          element : <AddForum/>
        },
        {
          path: "forums",
          element: <ViewAllForum allForm={true} />
        },
        {
          path: "/alumni/viewMyForum",
          element: <ViewAllForum myform={true} />
        },
        {
          path: "/alumni/viewJoinedForum",
          element: <ViewAllForum joinedForm={true} />
        },
        {
          path: "/alumni/updateForum/:forumId",
          element: <AddForum />
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
        },
        // {
        //   path: "/admin/forums",
        //   element: <ViewAllForum adminForm={true}/>
        // }

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
