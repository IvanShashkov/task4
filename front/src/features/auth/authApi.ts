import api from "../../api/api"

type userCredentials = {
    email: string,
    password: string,
    username: string,
}

const authApi = {
    getReg: ({ email, password, username }: userCredentials) => {
        return api.post('/reg', { email, password, username })
    },
    getLogin: ({ email, password, username }: userCredentials) => {
        return api.post('/login', { email, password, username })
    }
}

export default authApi