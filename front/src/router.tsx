import {createBrowserRouter} from "react-router-dom"
import TSLayout from "./components/TSLayout"

import Auth from "./features/auth/routes"
import Admin from "./features/admin/routes"

const router = createBrowserRouter([
    {
        path: '/',
        element: <TSLayout/>,
        children: [
            ...Admin,
            ...Auth,
        ],
    },
])

export default router