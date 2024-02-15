import AuthForms from "./pages/AuthForms"

const routes = [
    {
        path: 'registration',
        element: <AuthForms type={'registration'}/>
    },
    {
        path: 'login',
        element: <AuthForms type={'login'}/>
    },
]

export default routes
