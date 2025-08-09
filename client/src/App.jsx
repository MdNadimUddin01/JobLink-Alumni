import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Event, Home, UserOutlet, ViewAllJob ,ViewAllForum, ForumChat, ErrorPage } from "./Pages"
import { AddEvent, AddForum, AddJob, AlumniTable, SignIn, SignUp, VerifyEmail } from "./Component"
import {Toaster} from "react-hot-toast"

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

        // ------------------------------ Forum Chat --------------------------------

        {
          path: "/forumChat/:forumId",
          element : <ForumChat/>
        },


        // -------------------------------------------- Alumni --------------------------------------------------

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
        {
          path: "/admin/updateEvent/:eventId",
          element: <AddEvent update={ true} />
        },

        // {
        //   path: "/admin/forums",
        //   element: <ViewAllForum adminForm={true}/>
        // }

        {
          path: "*",
          element: <ErrorPage />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={route} />
      <Toaster position="top-right" />
    </>
  )
}

export default App
