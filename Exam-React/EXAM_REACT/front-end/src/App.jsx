
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import MainLayout from "./layouts/MainLayout"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import AuthLayout from "./layouts/AuthLayout"
import AddAppointmentPage from "./pages/AddAppointmentPage"
import SearchResult from "./components/SearchResult"

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<AuthLayout />} >
                    <Route index element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>

                <Route path="/" element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/addAppointment" element={<AddAppointmentPage />} />
                    <Route path="/result" element={<SearchResult />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </>
        )
    )

    return (

        <>

            <RouterProvider router={router} />

        </>

    )
}

export default App
